"""Build original, bilingual, simplified UI examples from the learning registry.
No customer screenshots, maps or remote assets are read. Examples are not live controls.
"""
from pathlib import Path
import json, html, textwrap
root=Path(__file__).resolve().parent.parent
catalog=json.loads((root/'public/assets/learning-catalog.json').read_text())
def text(value,x,y,size=16,width=65,color='#214936',limit=3):
 return ''.join(f'<text x="{x}" y="{y+i*(size+6)}" font-size="{size}" fill="{color}">{html.escape(line)}</text>'for i,line in enumerate(textwrap.wrap(str(value),width)[:limit]))
def rect(x,y,w,h,fill='#edf1e6',rx=10,stroke='none'):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}"/>'
for guide in catalog['guides']+catalog['classes']:
 for language,data in [('en',guide),('es',guide.get('es',{}))]:
  es=language=='es';mode=guide['deviceMode']
  badge=({'setup':'FULL TOOLS · SETUP','field':'FIELD WORK','both':'FIELD + FULL TOOLS','public':'PUBLIC TOOL'} if not es else {'setup':'TODAS LAS HERRAMIENTAS','field':'TRABAJO DE CAMPO','both':'CAMPO + CONFIGURACIÓN','public':'HERRAMIENTA PÚBLICA'})[mode]
  for number,step in enumerate(data.get('steps',[]),1):
   target=root/('public'+step['image']);target.parent.mkdir(parents=True,exist_ok=True)
   art=rect(0,0,760,360,'#e8eddf',20)+rect(18,18,724,324,'#fffef8',16,'#b5c4a5')+rect(18,18,724,50,'#153e2e',16)
   art+=text('GOLFOPTIX',38,49,16,20,'#efdfb6')+text(badge,335,49,12,48,'#efdfb6')
   art+=text(str(number)+'. '+step['title'],38,104,22,58,limit=2)
   if guide['id']=='map-navigation' or guide['id']=='class-mobile-field' and number in [1,2]:
    art+=rect(38,153,330,139,'#e4ead8')+'<path d="M110 278 Q165 240 170 190 Q180 160 220 166 Q260 172 238 198 Q220 246 200 278Z" fill="#a8c58c"/>'
    art+='<circle cx="223" cy="178" r="13" fill="#789d63"/><path d="M105 270 140 245 158 218 171 192 198 174" fill="none" stroke="#1f8db3" stroke-width="2"/>'
    for x,y in [(105,270),(140,245),(158,218),(171,192),(198,174)]:art+=f'<circle cx="{x}" cy="{y}" r="4" fill="white" stroke="#153e2e"/>'
    for j,label in enumerate(['Hoy','Mapa','Calendario','Más'] if es else ['Today','Map','Schedule','More']):art+=rect(42+j*80,299,77,25,'#d9e4cc',4)+text(label,48+j*80,316,11,12,limit=1)
    art+=rect(388,156,330,74,'#153e2e')+text(step['control'],405,186,15,35,'#fffef8',2)+text(step.get('example',''),389,262,14,37,limit=3)
   elif guide['id']=='chemical-record' and number==2:
    labels=['Cuándo y dónde','Cantidades','Condiciones'] if es else ['When & where','Product quantities','Conditions & checks']
    for j,label in enumerate(labels):
     art+=rect(38+j*232,158,220,80,'#153e2e' if j==1 else '#e8eddf')+text(str(j+1).zfill(2),52+j*232,184,13,10,'#dfbc77' if j==1 else '#657857')+text(label,52+j*232,213,14,24,'#fffef8' if j==1 else '#214936',1)
    art+=text('Atrás conserva los datos · Siguiente comprueba este paso' if es else 'Back retains entries · Next checks this step',40,274,16,70)+text('Enviar para aprobación solo en el último paso' if es else 'Submit for approval only on the final step',40,306,14,80)
   elif guide['id']=='reports' and number==1:
    pass
   else:
    art+=rect(38,157,684,83,'#153e2e')+text(step.get('control',''),58,188,16,72,'#fffef8',2)+text(step.get('example',step['text']),40,274,14,88,limit=2)
   # Reporting uses labeled status cards, never invented financial totals.
   if guide['id']=='reports' and number==1:
    for j,label in enumerate(['Gastos registrados','Saldo disponible','Trabajo pendiente'] if es else ['Recorded spending','Available allowance','Open work']):
     art+=rect(38+j*232,157,220,100,'#edf1e6',10,'#c5d1b8')+text(label,50+j*232,187,14,24,limit=2)+text('DEMO',50+j*232,236,22,10,'#a18443')
    art+=text('Más → Informes · Todas las herramientas para el detalle' if es else 'More → Reports · Full tools for detailed analysis',40,298,15,82)
   art+=text('EJEMPLO SIMPLIFICADO · no son controles activos' if es else 'SIMPLIFIED EXAMPLE · not live controls',40,334,10,110,'#65755c',1)
   svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="760" height="360" viewBox="0 0 760 360" role="img" aria-label="{html.escape(step["title"],quote=True)}">'+art+'</svg>'
   target.write_text(svg)
print('Learning illustrations rebuilt from the bilingual registry.')
