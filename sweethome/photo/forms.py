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
        attrs={"class":"input", 'placeholder':"Название альбома"}
    ))
    text = forms.CharField(widget=forms.TextInput(
        attrs={"class":"input", 'placeholder':"Описание альбома"}
    ))
    date = forms.DateField(widget=forms.TextInput(
        attrs={"type":"date"}
    ))
    category = forms.ChoiceField(choices=CATEGORIS)

    class Meta:
        fields = ["name", "text", "date", "category"]
        model = Albom