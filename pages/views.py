from django.shortcuts import render, get_object_or_404
from django.core import exceptions
from django.utils import timezone
import socket

from .models import Hits


# Create your views here.
def index(request):
    try:
        hits = Hits.objects.latest('-date_creation')
    except exceptions.ObjectDoesNotExist as e:
        hits = Hits()
        hits.date_creation = timezone.now()
    hits.count += 1
    host = str(socket.gethostname())
    hits.save()
    return render(request, 'pages/index.html', {'hits': hits.count, 'host': host})
