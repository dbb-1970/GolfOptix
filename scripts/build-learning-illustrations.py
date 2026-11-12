"""Build original, labeled examples from the versioned learning registry.
No customer screenshots or remote assets are read by this authoring tool.
"""
from pathlib import Path
import json, html, textwrap
root=Path(__file__).resolve().parent.parent
catalog=json.loads((root/'public/assets/learning-catalog.json').read_text())
for guide in catalog['guides']+catalog['classes']:
 for language,data in [('en',guide),('es',guide.get('es',{}))]:
  for number,step in enumerate(data.get('steps',[]),1):
   target=root/('public'+step['image']);target.parent.mkdir(parents=True,exist_ok=True)
   def draw(text,x,y,size,width,color='#214936',limit=3):
    return ''.join(f'<text x="{x}" y="{y+i*(size+8)}" font-size="{size}" fill="{color}">{html.escape(line)}</text>'for i,line in enumerate(textwrap.wrap(text,width)[:limit]))
   label='GOLFOPTIX · EJEMPLO ILUSTRADO' if language=='es' else 'GOLFOPTIX · ILLUSTRATED EXAMPLE'
   svg='<svg xmlns="http://www.w3.org/2000/svg" width="760" height="360" viewBox="0 0 760 360"><rect width="760" height="360" rx="20" fill="#e8eddf"/><rect x="20" y="20" width="720" height="320" rx="15" fill="#fffef8" stroke="#b5c4a5"/><rect x="20" y="20" width="720" height="55" rx="15" fill="#153e2e"/><g font-family="Arial">'+draw(label,42,54,15,60,'#efdfb6')+draw(str(number)+'. '+step['title'],45,120,23,50,limit=2)+'<rect x="45" y="170" width="670" height="80" rx="10" fill="#173e30"/>'+draw(step.get('control',''),65,202,15,72,'#fffef8',2)+draw(step.get('example',step['text']),45,280,15,80)+'</g></svg>'
   target.write_text(svg)
print('Learning illustrations rebuilt from the registry.')
