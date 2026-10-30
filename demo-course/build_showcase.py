"""Fictional demonstration irrigation over public-source terrain used in the earlier Augusta study.
This is not Augusta irrigation. Customer engineering sources are never used.
"""
from pathlib import Path
import xml.etree.ElementTree as E,math,json,copy,re
R=Path(__file__).resolve().parents[1];O=R/'public/test-drive-assets';N='http://www.w3.org/2000/svg';E.register_namespace('',N)
source=E.parse(R.parents[1]/'research/augusta-national/map/masters/AUGUSTA-MASTER.svg').getroot()
def el(tag,p,a={},text=None):
 q=E.SubElement(p,'{'+N+'}'+tag,{str(k):str(v) for k,v in a.items()})
 if text is not None:q.text=str(text)
 return q
names=['First Light','Juniper Rise','Heron Bend','The Narrows','Copper Sands','Stillwater','Lakeside','Cypress Gate','Homeward','The Crossing','Fox Hollow','Long Reach','Whispering Pines','Silverbank','The Lookout','Island Turn','Golden Hour','Harbour Home'];pars=[4,5,4,3,4,3,4,5,4,4,4,3,5,4,5,3,4,4]
svg=E.Element('{'+N+'}svg',{'viewBox':'20 430 1860 2220','width':'1860','height':'2220','font-family':'Arial, sans-serif'})
el('title',svg,{},'Juniper Cove — fictional Lakes Course Test Drive')
el('desc',svg,{},'Fictional showcase; terrain adapted from public OpenStreetMap Augusta-area mapping. All irrigation is simulated, never a claim about Augusta National infrastructure.')
defs=copy.deepcopy(source.find('{'+N+'}defs'));svg.append(defs);base=el('g',svg,{'id':'master-derived-geometry'})
el('rect',base,{'x':20,'y':430,'width':'1860','height':'2220','fill':'#ecf0e3'})
for id in ['course-footprint','terrain','holes']:
 g=copy.deepcopy(source.find(f'{{{N}}}g[@id="{id}"]'));base.append(g)
# Source terrain stays in its established frame; irrigation below is an illustrative new layer.
holes=base.find(f'{{{N}}}g[@id="holes"]');routeData={}
heads=valves=branches=0
for n in range(1,19):
 route=source.find(f'.//{{{N}}}path[@id="play-route-{n:02}"]');points=[tuple(map(float,p)) for p in re.findall(r'(-?[0-9.]+),(-?[0-9.]+)',route.get('d'))];routeData[n]=points
 g=holes.find(f'{{{N}}}g[@id="hole-{n:02}"]')
 # Drop empty engineering placeholders; only fictional infrastructure is added.
 for child in list(g):
  if child.get('id','').endswith(('water-lines','sprinkler-heads','valves','asset-labels')):g.remove(child)
 pipes=el('g',g,{'id':f'hole-{n:02}-water-lines'});hg=el('g',g,{'id':f'hole-{n:02}-heads'});vg=el('g',g,{'id':f'hole-{n:02}-valves'});labels=el('g',g,{'id':f'hole-{n:02}-asset-labels','fill':'#245369','font-size':9})
 lengths=[math.dist(a,b) for a,b in zip(points,points[1:])];total=sum(lengths)
 def at(t,offset):
  d=t*total
  for i,length in enumerate(lengths):
   if d<=length or i==len(lengths)-1:
    a,b=points[i:i+2];f=d/length if length else 0;dx=b[0]-a[0];dy=b[1]-a[1];return(a[0]+dx*f-dy/length*offset,a[1]+dy*f+dx/length*offset)
   d-=length
 count=max(4,round(total/44));positions=[]
 for side in [-1,1]:
  row=[at(.08+.78*i/(count-1),side*19) for i in range(count)];id=f'DEMO-H{n:02}-ROW-{side}';p=el('path',pipes,{'id':id,'data-source-branch':id,'d':'M'+' L'.join(f'{x:.2f},{y:.2f}' for x,y in row),'fill':'none','stroke':'#2788b2','stroke-width':1.6});el('title',p,{},'Simulated fairway lateral');positions+=row;branches+=1
 gx,gy=points[-1];ring=[(gx+22*math.cos(i*math.tau/6),gy+19*math.sin(i*math.tau/6)) for i in range(7)];id=f'DEMO-H{n:02}-GREEN-LOOP';el('path',pipes,{'id':id,'data-source-branch':id,'d':'M'+' L'.join(f'{x:.2f},{y:.2f}' for x,y in ring),'fill':'none','stroke':'#2788b2','stroke-width':1.6});positions+=ring[:-1];branches+=1
 for k,(x,y) in enumerate(positions,1):
  id=f'DEMO-H{n:02}-HEAD-{k:02}';el('circle',hg,{'id':id,'cx':f'{x:.2f}','cy':f'{y:.2f}','r':3.2,'fill':'white','stroke':'#162f29','stroke-width':1});el('text',labels,{'id':id+'-label','data-asset-id':id,'x':x+5,'y':y-4,'paint-order':'stroke','stroke':'#e3ebda','stroke-width':2},f'{n}-{k:02}');heads+=1
 for k,(x,y) in enumerate([positions[0],positions[count],ring[0]],1):
  v=el('path',vg,{'id':f'DEMO-H{n:02}-VALVE-{k}','data-kind':'valve','d':f'M{x-4} {y-4} L{x+5} {y} L{x-4} {y+4} Z','fill':'#101f1b'});el('title',v,{},f'V{n}-{k}');valves+=1
 ann=source.find('.//{'+N+'}g[@id="annotations"]');badge=copy.deepcopy(ann.find(f'{{{N}}}g[@id="hole-badge-{n:02}"]'));badge.set('id',f'badge-{n:02}');badge.set('data-hole-link',str(n));badge.set('role','button');badge.set('tabindex','0');badge.set('aria-label',f'Open Hole {n}');base.append(badge)
el('text',base,{'x':120,'y':490,'font-size':35,'font-family':'Georgia, serif','fill':'#254e3b'},'JUNIPER COVE');el('text',base,{'x':122,'y':525,'font-size':14,'letter-spacing':4,'fill':'#5d7458'},'LAKES COURSE · FICTIONAL TEST DRIVE')
el('text',base,{'x':1740,'y':505,'text-anchor':'middle','font-size':21,'fill':'#315743'},'N');el('path',base,{'d':'M1740 523 l-12 40 12 -8 12 8 Z','fill':'#315743'})
el('text',base,{'x':950,'y':2610,'text-anchor':'middle','font-size':15,'fill':'#667e5c'},'ILLUSTRATIVE IRRIGATION · NOT AN ENGINEERING PLAN')
E.ElementTree(svg).write(O/'overview.svg',encoding='utf-8',xml_declaration=True)
def localTerrain(points):
 tree=copy.deepcopy(base.find('{'+N+'}g[@id="terrain"]'))
 left=min(p[0] for p in points)-150;right=max(p[0] for p in points)+150;top=min(p[1] for p in points)-150;bottom=max(p[1] for p in points)+150
 for parent in list(tree.iter()):
  for child in list(parent):
   if child.tag!='{'+N+'}path':continue
   p=[tuple(map(float,q)) for q in re.findall(r'(-?[0-9.]+),(-?[0-9.]+)',child.get('d',''))]
   if p and (max(q[0] for q in p)<left or min(q[0] for q in p)>right or max(q[1] for q in p)<top or min(q[1] for q in p)>bottom):parent.remove(child)
 return tree
for n in range(1,19):
 points=routeData[n];a,b=points[0],points[-1];cx=(min(p[0] for p in points)+max(p[0] for p in points))/2;cy=(min(p[1] for p in points)+max(p[1] for p in points))/2;angle=-90-math.degrees(math.atan2(b[1]-a[1],b[0]-a[0]));length=sum(math.dist(a,b) for a,b in zip(points,points[1:]));scale=min(1.6,330/(length+85))
 s=E.Element('{'+N+'}svg',{'viewBox':'0 0 400 600','width':'800','height':'1200','font-family':'Arial, sans-serif'});el('title',s,{},f'Hole {n} — {names[n-1]} — fictional Test Drive');s.append(copy.deepcopy(defs));el('rect',s,{'width':400,'height':600,'fill':'#f7f7ed'});el('text',s,{'x':25,'y':36,'font-size':12,'letter-spacing':2,'fill':'#718068'},'JUNIPER COVE / LAKES COURSE');el('text',s,{'x':25,'y':72,'font-size':29,'font-family':'Georgia, serif','fill':'#244c37'},f'{n:02}  {names[n-1]}');el('text',s,{'x':25,'y':99,'font-size':12,'fill':'#718068'},f'PAR {pars[n-1]} · FICTIONAL IRRIGATION STUDY')
 cl=el('clipPath',s,{'id':'hole-clip'});el('rect',cl,{'x':18,'y':120,'width':364,'height':415,'rx':12});c=el('g',s,{'clip-path':'url(#hole-clip)'});el('rect',c,{'x':18,'y':120,'width':364,'height':415,'fill':'#dce5d0'});frame=el('g',c,{'id':'master-derived-geometry','transform':f'translate(200 327) scale({scale:.4f}) rotate({angle:.3f}) translate({-cx:.2f} {-cy:.2f})'});frame.append(localTerrain(points));frame.append(copy.deepcopy(holes.find(f'{{{N}}}g[@id="hole-{n:02}"]')))
 comp=el('g',s,{'transform':f'translate(350 155) rotate({angle:.3f})'});el('path',comp,{'d':'M0 -14 L-4 7 0 4 4 7 Z','fill':'#365541'});el('text',comp,{'x':0,'y':-20,'font-size':9,'text-anchor':'middle','fill':'#365541'},'N')
 el('text',s,{'x':200,'y':562,'text-anchor':'middle','font-size':11,'fill':'#61765c'},'All irrigation is fictional. Test Drive changes are temporary.');el('text',s,{'x':200,'y':586,'text-anchor':'middle','font-size':8,'fill':'#78896d'},'Terrain adapted from © OpenStreetMap contributors · ODbL 1.0')
 for prefix in ['hole','card']:E.ElementTree(s).write(O/f'{prefix}-{n:02}.svg',encoding='utf-8',xml_declaration=True)
(O/'manifest.json').write_text(json.dumps({'customer':'Juniper Cove Golf Club','course':'Lakes Course','revision':'demo-001','fictional':True,'terrain_source':'OpenStreetMap Augusta-area mapping; ODbL 1.0','irrigation':'Entirely simulated; no real infrastructure claim','heads':heads,'valves':valves,'branches':branches,'holes':[{'hole':n,'name':names[n-1],'par':pars[n-1],'partial':False} for n in range(1,19)]},indent=2))
print(heads,valves,branches)
