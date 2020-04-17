from django.shortcuts import render
from .utils import request_data


# Create your views here.
def request_viewer(request):
    header_data, body_data = request_data()
    return render(request, 'data_request/request_viewer.html',
                  {'header_data': dict(header_data), 'body_data': body_data})
