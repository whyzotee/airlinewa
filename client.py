from fasthtml.common import *

tailwind = Script("https://unpkg.com/@tailwindcss/browser@4")
app,rt = fast_app(hdrs=[tailwind])

@rt('/')
def get(): 
    return Main(
        cls="text-"
    )

@rt('/change')
def get(): return P('Nice to be here!')

serve()