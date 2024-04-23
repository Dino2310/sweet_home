
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include(("controller.urls", "controller"), namespace = 'controller')),
    path('pharmacy/', include(("first_aid_kit.urls", "first_aid_kit"), namespace = 'first_aid_kit' )),
    path("photo/", include(("photo.urls", 'photo'), namespace = "photo")),
]

urlpatterns += static(
    settings.STATIC_URL,
    document_root = settings.STATIC_ROOT

)

urlpatterns +=static(
    settings.MEDIA_URL,
    document_root = settings.MEDIA_ROOT
)
