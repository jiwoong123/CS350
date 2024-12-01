import logging
from ultralytics import YOLO
import cv2
import time  # 시간을 측정하기 위한 모듈

def inInUse(x_min, y_min, x_max, y_max):
    if y_min < 100:
        return True
    else:
        return False


logging.getLogger('ultralytics').setLevel(logging.ERROR)

# YOLOv8 모델 로드
model = YOLO('yolov8n.pt')  # Nano 모델

# 웹캡처
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("웹캠을 열 수 없습니다.", flush=True)
    exit()

preUse = False
detected = False
use_start_time = None  # 'current_use'가 True일 때 시간을 기록할 변수
use_end_time = None    # 'current_use'가 False일 때 시간을 기록할 변수

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # YOLO 모델로 프레임 처리
    results = model.predict(source=frame, save=False, show=False)  # 실시간 예측

    # 결과 처리 및 시각화
    annotated_frame = results[0].plot()  # 감지된 객체 그리기
    
    for result in results[0].boxes:
        if result.cls or detected:
            break
        detected = True
        x_min, y_min, x_max, y_max = result.xyxy[0].tolist()  # 첫 번째 객체의 좌표
        current_use = inInUse(x_min, y_min, x_max, y_max)        

        if current_use != preUse:
            # 'current_use'가 변경될 때마다 타이머 초기화
            if current_use:
                use_start_time = time.time()  # 사용 시작 시간 기록
            else:
                use_end_time = time.time()  # 사용 종료 시간 기록

        # 'current_use'가 True일 때 2초 이상 지속되면 print
        if current_use and use_start_time and (time.time() - use_start_time >= 2):
            print("True", flush=True)
            use_start_time = None  # 2초 후에는 상태를 리셋

        # 'current_use'가 False일 때 2초 이상 지속되면 print
        if not current_use and use_end_time and (time.time() - use_end_time >= 2):
            print("False", flush=True)
            use_end_time = None  # 2초 후에는 상태를 리셋

        preUse = current_use

    detected = False
    # 화면 출력
    cv2.imshow("YOLOv8 Real-Time Detection", annotated_frame)

    # ESC 키로 종료
    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()
