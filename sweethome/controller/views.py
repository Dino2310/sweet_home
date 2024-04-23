from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from .forms import *
from .utils import *
from .settings_ligth import *
from django_ajax.decorators import ajax
from environs import Env
import os

env: Env = Env()

def index(request):
    light = {
        "hall": range(t_hall),
        "wardrobe": range(t_wardrobe),
        "wc": range(t_wс)
    }
    return render(request, 'controller/index.html', light|lamp_list)

@ajax
def example(request):
    res = request.GET
    lamp_list[res["lampId"]] = on if res["res"] == off else off
    return{"result":lamp_list[res["lampId"]]}