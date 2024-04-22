from django.shortcuts import render
from django.http import request
import requests

def photo(req):
    light = {
        "hall": range(2),
        "wardrobe": range(2),
        "wc": range(2)
    }
    # print(requests.get("https://apteki.medsi.ru/"))
    return render(req, 'controller/index.html', light)

def create_albom(request):
    light = {
        "hall": range(2),
        "wardrobe": range(2),
        "wc": range(2)
    }
    # print(requests.get("https://apteki.medsi.ru/"))
    return render(request, 'controller/index.html', light)