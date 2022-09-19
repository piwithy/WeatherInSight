from django.http import HttpResponse

from . import utils


# Create your views here.

def request_new_data(request):
    return HttpResponse("OK", status=200)
    # Disabled data refresh
    # header, body, status = utils.request_data()
    # if status == 200:
    #    return HttpResponse("OK", status=status)
    # else:
    #    return HttpResponse("Error", status=status)
