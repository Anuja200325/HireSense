# backend/core/urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.http import HttpResponse
from .views import home




def home(request):
    return HttpResponse("Welcome to HireSense backend!")


urlpatterns = [
    path('', home, name='home'),
    path('api/', include('interview.urls')),
   

    # other routes
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)





