#!/usr/bin/env python3
"""Local preview server that mirrors vercel.json: real files are served as-is,
any other path (/art/<slug>, /collection, /about) falls back to index.html.

Usage: python3 tools/dev_server.py [port] [directory]
"""
import http.server, os, sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4324
ROOT = os.path.abspath(sys.argv[2] if len(sys.argv) > 2 else os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) and '.' not in os.path.basename(self.path.split('?')[0]):
            self.path = '/index.html'
        return super().send_head()


http.server.ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
