from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from userauth import settings
from django.core.mail import send_mail, EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from . tokens import generate_token

# Create your views here.
def home(request):
    return render(request, 'user_auth/index.html')

def signup(request):
# superuser eliezheng: 1234

    if request.method == "POST":
        username = request.POST.get('username')
        # OR username = request.POST['username]
        fname = request.POST.get('fname')
        lname = request.POST['lname']
        email = request.POST['email']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']

        if User.objects.filter(username=username):
            messages.error(request, "Username already exists. Please a different username!")
            return redirect('home')
        
        if User.objects.filter(email=email):
            messages.error(request, "Email already registered. Please use a different email!")
            return redirect('home')

        if len(username)>10:
            messages.error(request, "Username must be under 10 characters")

        if pass1 != pass2:
            messages.error(request, 'Passwords do not match.')
        
        if not username.isalnum():
            messages.error(request, 'Username can only contain numbers and letters')
            return redirect('home')

        myuser = User.objects.create_user(username, email, pass1)
        myuser.first_name = fname
        myuser.last_name = lname
        myuser.is_active = False
        myuser.save()

        messages.success(request, "Your account has been successfully created. We have sent you a confirmation email, please confirm your email in order to continue!")

        # Welcome Email
        subject = "Welcome to Django UserAuth Project"
        message = "Hello " + myuser.first_name + "!! \n" + "Welcome to my project! \n Thank you for visiting our website \n We have also sent you a confirmation email, please confirm your email address in order to activate your account. \n\n Thank you!"
        from_email = settings.EMAIL_HOST_USER
        to_list = [myuser.email]
        send_mail(subject, message, from_email, to_list, fail_silently=True)

        # Email Address Confirmation Email
        current_site = get_current_site(request)
        email_subject = "Confirm your email for Django UserAuth Project"
        message2 = render_to_string('email_confirmation.html', {
            'name': myuser.first_name,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(myuser.pk)),
            'token': generate_token.make_token(myuser),
        })
        email = EmailMessage(
            email_subject,
            message2,
            settings.EMAIL_HOST_USER,
            [myuser.email],
        )
        email.fail_silently = True
        email.send()

        return redirect('signin')

    return render(request, "user_auth/signup.html")

def signin(request):

    if request.method == "POST":
        username = request.POST['username']
        pass1 = request.POST['pass1']

        user = authenticate(username=username, password=pass1)
        if user is not None:
            login(request, user)
            fname = user.first_name
            return render(request, "user_auth/index.html", {'fname':fname})
        else:
            messages.error(request, "Either the username or password entered is incorrect.")
            return redirect("signin")

    return render(request, "user_auth/signin.html")

def signout(request):
    logout(request)
    messages.success(request, 'Logged out Succesfully!')
    return redirect('home')

def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        myuser = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        myuser = None
    
    if myuser is not None and generate_token.check_token(myuser,  token):
        myuser.is_active = True
        myuser.save()
        login(request, myuser)
        return redirect('home')
    else:
        return render(request, 'activation_failed.html')
