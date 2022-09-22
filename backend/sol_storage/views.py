from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import exceptions
from django.views.decorators.csrf import csrf_exempt

import json

from .models import Sol


def home(request):
    return HttpResponse("Forbidden", status=403)

@csrf_exempt
def import_data(request):
    if request.method == "POST":
        data = json.loads(request.body)
        for sol in data:
            try: 
                db_sol = Sol.objects.get(sol_number=sol['sol_date'])
            except exceptions.ObjectDoesNotExist:
                db_sol = Sol.create(sol)
                db_sol.save()
            except exceptions.MultipleObjectsReturned:
                return HttpResponse("Internal Error", status=500)
        return HttpResponse("Ok", status=200)
    return HttpResponse("bad Request", status=400)
    
            
def export_data(request):
    sol_id = request.GET.get("sol_id", '')
    last_sols = request.GET.get("last", '')
    if sol_id:
        try:
            db_sol = Sol.objects.get(sol_number = int(sol_id))
            sol_number, sol_data = db_sol.export()
            return JsonResponse({str(sol_number): sol_data})
        except exceptions.ObjectDoesNotExist:
            return HttpResponse("Sol {} Not Found".format(sol_id), status=404)
        except exceptions.MultipleObjectsReturned:
            return HttpResponse("Internal Server Error", status=500)
    elif last_sols:
        try:
            sol_count = int(last_sols)
            db_sols = Sol.objects.all().order_by("-sol_number")
            if sol_count > 0:
                db_sols = db_sols[:sol_count]
            sols = {}
            for db_sol in db_sols:
                sol_number, sol_data = db_sol.export()
                sols[str(sol_number)] = sol_data
            return JsonResponse(sols)
        except exceptions.ObjectDoesNotExist:
            return HttpResponse("No Sol Found", status=404)
    return HttpResponse("Bad Request", status=400)
