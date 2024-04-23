from django.shortcuts import render, redirect
from django.http import request
from .forms import *
from .models import *
import requests
from django_ajax.decorators import ajax
import slider

print(slider)


def photos(request):
    if request.GET:
        alboms =Albom.objects.filter(category = request.GET.get("cat"))
    else:
        alboms = Albom.objects.all()

    return render(request, 'photo/albom.html',{'alboms':alboms})

def create_albom(request):
    img = AlbomForm(request.POST)
    if request.method == "POST" and img.is_valid():
        instance = img.save(commit=False)
        instance.save()
        request.session["albom"] = instance.id
        for index, img in enumerate(request.FILES.getlist('images')):
            Photo.objects.create(albom =instance, image = img, order = index+1, comment = instance.name )
        return redirect("photo:edit_albom")

    img = AlbomForm()
    return render(request, 'photo/create_albom.html',  {"form":img})

def edit_albom(request, albom = False):
    albom = albom or request.session.get('albom')
    alb = Albom.objects.filter(id = albom)
    if not alb:
        return redirect('photo:photos')
    alb=alb[0]
    images = Photo.objects.filter(albom__id = albom )
    contetnt={
        "images":images,
        'alb':alb
    }
    if images:
        return render(request, 'photo/edit_albom.html', contetnt)
    alb.delete()
    return redirect('photo:photos')
    
def show(request, id):
    obj = Albom.objects.get(id = id)
    images = Photo.objects.filter(albom = obj).order_by("order")
    
    print(slider)
    return render(request, 'photo/show_albom.html',{'albom':obj, "images":images})

@ajax
def object_del(request):
    res = request.GET['id']
    obj = Photo.objects.get(id = res)
    albom = obj.albom_id
    obj.delete()
    edit_albom(request, albom)
