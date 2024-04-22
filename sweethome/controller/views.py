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

off = "rgb(125, 125, 125)"
on = "rgb(255, 255, 0)"


lamp_list = {
    "L1_kitchen":off,
    "L2_kitchen":off,
    "L_bedroom":off,
    "grup_hall":off,
    "grup_wardrobe":off,
    "bedside_lamp_left":off,
    "bedside_lamp_right":off,
    "grup_wc":off
}

def index(request):
    light = {
        "hall": range(t_hall),
        "wardrobe": range(t_wardrobe),
        "wc": range(t_wс)
    }
    return render(request, 'controller/index.html', light|lamp_list)

@ajax
def exemple(request):
    res = request.GET
    lamp_list[res["lampId"]] = on if res["res"] == off else off
    return{"result":lamp_list[res["lampId"]]}