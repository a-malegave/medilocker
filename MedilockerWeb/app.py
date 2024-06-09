# from pyzbar.pyzbar import decode
import random
from flask import Flask, Response, render_template, request, jsonify
import cv2
import numpy as np
# from flask import Flask, render_template
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.calibration import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import RandomizedSearchCV
# from xgboost import XGBClassifier
from sklearn.svm import SVC
from matplotlib import pyplot as plt
from imblearn.over_sampling import SMOTE
import datetime
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
# from autots import AutoTS
import seaborn as sns
import io
import base64
import pandas as pd

app = Flask(__name__)

@app.route('/')



def index():
    
    return render_template('login.html')



@app.route('/regForm')
def regForm():
    return render_template('regForm.html')


@app.route('/users')
def users():
    # You can fetch user data here if needed
    return render_template('searchUser.html')


@app.route('/form')
def form():
    # You can fetch user data here if needed
    return render_template('form.html')


@app.route('/users')
def home():
    # You can fetch user data here if needed
    return render_template('index.html')


@app.route('/register')
def register():
    # You can fetch user data here if needed
    return render_template('register.html')

@app.route('/forgotpassword')
def forgotpassword():
    # You can fetch user data here if needed
    return render_template('forgot-password.html')

@app.route('/login')
def login():
    # You can fetch user data here if needed
    return render_template('login.html')

@app.route('/profile')
def profile():
    # You can fetch user data here if needed
    return render_template('profile.html')


@app.route('/table')
def table():
    # You can fetch table data here if needed
    return render_template('table.html')


def detect_qr_code(image):
    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Use OpenCV's QRCodeDetector to detect and decode QR codes
    qr_decoder = cv2.QRCodeDetector()
    decoded_info, _ = qr_decoder.detectAndDecodeMulti(gray)
    
    qr_data = []
    # Extract QR code data from the decoded information
    for info in decoded_info:
        qr_data.append(info)
    
    return qr_data







@app.route('/insights')
def insights():

    # Render the template with the plot image path
    return render_template('insights.html')

    # return render_template('insights.html', summary_stats=summary_stats, corr_matrix=corr_matrix, plot_data=plot_data)








if __name__ == '__main__':
    app.run(debug=True)
