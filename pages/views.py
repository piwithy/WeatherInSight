from django.shortcuts import render


# Create your views here
def redirector(request):
    """
    View used to get browser language && redirect to good website
    """
    return render(request, 'pages/redirector.html')


def nav_bar(request, lang='en'):
    """
    View used to load the Navigation bar from page Canvas
    """
    env = {'lang': lang}
    return render(request, 'pages/common/nav_bar.html', env)


def footer(request, lang='en'):
    """
    View used to load the Footer from page Canvas
    """
    env = {'lang': lang}
    return render(request, 'pages/common/footer.html', env)


def index(request, lang='en'):
    """
    index page of the website
    """
    data = {'lang': lang}
    request.session['data'] = data
    env = {'lang': lang, 'title_en': "Coming Soon!", 'title_fr': 'Bientôt Disponible!', 'content_id': 'data_view:index'}
    return render(request, 'pages/common/page_canvas.html', env)


def data_index(request, lang='en'):
    """
    Index page of the website (DATA)
    """
    data = {'lang': lang}
    request.session['data'] = data
    env = {'lang': lang, 'title_en': "Data Index!", 'title_fr': 'Index des Donées!',
           'content_id': 'data_view:data_index'}
    return render(request, 'pages/common/page_canvas.html', env)


def list_view(request, lang='en'):
    """
    View of the list of sols
    """
    data = {'lang': lang}
    request.session['data'] = data
    env = {'lang': lang, 'title_en': "Sols List", 'title_fr': 'Liste des Sols', 'content_id': 'data_view:list'}
    return render(request, 'pages/common/page_canvas.html', env)


def detail_view(request, sol_key, lang='en'):
    """
    View of the details of a Sol
    """
    data = {'lang': lang, 'sol_key': sol_key}
    request.session['data'] = data
    env = {'lang': lang, 'title_en': "Sol Detail", 'title_fr': 'Détail du Sol', 'content_id': 'data_view:sol_details'}
    return render(request, 'pages/common/page_canvas.html', env)


def wind_rose(request, sol_key, lang='en'):
    """
    View of the wind rose of a Sol
    """
    data = {'lang': lang, 'sol_key': sol_key}
    request.session['data'] = data
    env = {'lang': lang, 'title_en': "Sol Wind Rose", 'title_fr': 'Rose des Vents au Sol',
           'content_id': 'data_view:sol_wind_rose'}
    return render(request, 'pages/common/page_canvas.html', env)


def request_viewer(request, lang='en'):
    """
    View of the Full Request Response
    """
    data = {'lang': lang}
    request.session['data'] = data
    env = {'lang': lang, 'title_en': "Request View", 'title_fr': 'Vue de la Requête',
           'content_id': 'data_view:request_view'}
    return render(request, 'pages/common/page_canvas.html', env)
