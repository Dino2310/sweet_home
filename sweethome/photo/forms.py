from django import forms
from .models import *
 
class ImageForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = ['image']
        widgest = {
            "image" :forms.ImageField()
        }

class AlbomForm(forms.ModelForm):
    name = forms.CharField(widget=forms.TextInput(
        attrs={"class":"input", 'plaseholder':"Название альбома"}
    ))
    text = forms.CharField(widget=forms.CharField(
        attrs={"class":"input", 'plaseholder':"Описание альбома"}
    ))
    date = forms.DateField()
    category = forms.ChoiceField()

    class Meta:
        fields = ["name", "text", "date", "category"]
        model = Albom