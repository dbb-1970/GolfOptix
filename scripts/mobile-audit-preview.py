"""Loopback-only fixed-size UI review. Serves public demo files, never private course assets."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGE = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>GolfOptix · fixed phone audit</title><style>
*{box-sizing:border-box}html,body{height:100%;margin:0}body{font:14px Arial;background:#e8ece1;color:#163b2d;display:flex;flex-direction:column;overflow:hidden}header{padding:12px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;background:#0c2e23;color:#f4e3b8}header strong{display:block;font-size:16px}header small{display:block;margin-top:4px;font-size:12px;color:#d2ddca}.badge{padding:7px 10px;border:1px solid #c9b279;border-radius:20px;white-space:nowrap;font-size:11px}main{flex:1;min-height:0;display:grid;place-items:center;padding:12px}#holder{position:relative;flex-shrink:0}iframe{position:absolute;top:0;left:0;width:420px;height:800px;border:0;transform-origin:top left;background:#f7f6ed;box-shadow:0 8px 35px #09271b40;border-radius:14px}footer{padding:8px 16px 12px;text-align:center;font-size:12px;color:#52664c}#route{font-size:11px;max-width:56vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}@media(max-width:600px){header{padding:9px 12px}header strong{font-size:14px}.badge{font-size:10px}footer{font-size:10px}}
</style></head><body><header><div><strong>GolfOptix · Screen-by-screen audit</strong><small id="route">My Day · In review · not approved</small></div><span class="badge">iPhone Air width · 420 × 800</span></header><main id="space"><div id="holder"><iframe id="phone" title="Interactive GolfOptix phone preview" src="/test-drive/crew/?course=juniper-cove-lakes&view=day&person=me"></iframe></div></main><footer>Fixed mobile layout · click inside to use · browser/GPS/touch behavior still needs the real iPhone</footer><script>
const frame=document.getElementById('phone'),space=document.getElementById('space'),holder=document.getElementById('holder');function fit(){const s=Math.min(1,(space.clientWidth-28)/420,(space.clientHeight-24)/800);holder.style.width=420*s+'px';holder.style.height=800*s+'px';frame.style.transform='scale('+s+')';}new ResizeObserver(fit).observe(space);fit();frame.addEventListener('load',()=>{try{document.getElementById('route').textContent=(frame.contentDocument.title||'GolfOptix')+' · In review · not approved';}catch{}});
</script></body></html>'''

class Preview(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):
        super().__init__(*args,directory=str(ROOT/'public'),**kwargs)
    def do_GET(self):
        path=urlsplit(self.path).path
        if path=='/__phone/':
            data=PAGE.encode();self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data);return
        if path.startswith('/api/'):
            self.send_error(404,'Local demo preview has no production API');return
        return super().do_GET()

if __name__=='__main__':
    print('Fixed phone audit: http://127.0.0.1:4188/__phone/',flush=True)
    ThreadingHTTPServer(('127.0.0.1',4188),Preview).serve_forever()
