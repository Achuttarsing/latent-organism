import re
import cv2
import mediapipe as mp
import time

#from socketio import Client
from cv2 import imread, imencode
import base64

mpPose = mp.solutions.pose
pose = mpPose.Pose()
mpDraw = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)
#cap = cv2.VideoCapture('a.mp4')
pTime = 0

while True:
	success, img = cap.read()
	imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
	results = pose.process(imgRGB)
	#print(re.sub(r'\n',r'',str(results.pose_landmarks)))
	nose = results.pose_landmarks.landmark[0]
	print(f'[{nose.x}, {nose.y}, {nose.z}]')
	#print(list(dir(results.pose_landmarks)))
	#print(results.pose_landmarks['x'])
	#if results.pose_landmarks:
		#mpDraw.draw_landmarks(img, results.pose_landmarks, mpPose.POSE_CONNECTIONS)
		#for id, lm in enumerate(results.pose_landmarks.landmark):
		#	h, w,c = img.shape
		#	print(id, lm)
		#	cx, cy = int(lm.x*w), int(lm.y*h)
		#	cv2.circle(img, (cx, cy), 5, (255,0,0), cv2.FILLED)
	
	#cTime = time.time()
	#fps = 1/(cTime-pTime)
	#pTime = cTime
	
	#cv2.putText(img, str(int(fps)), (50,50), cv2.FONT_HERSHEY_SIMPLEX,1,(255,0,0), 3)
	#cv2.imshow("Image", img)
	cv2.waitKey(1)