from fasthtml.common import *

tailwind = Script("https://unpkg.com/@tailwindcss/browser@4")
app,rt = fast_app(hdrs=[tailwind])

@rt('/{fname:path}.{ext.static}')
def get(fname: str, ext: str): 
    return FileResponse(f"static/{fname}.{ext}")

@rt("/")
def get():
    return Div(H1("Hello World!", cls="multicolor-text text-[50px]"))

serve()