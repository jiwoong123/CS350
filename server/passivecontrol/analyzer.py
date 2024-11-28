from ultralytics import YOLO
import cv2

# YOLOv8 모델 로드
model = YOLO('yolov8n.pt')  # Nano 모델

# 웹캠 캡처
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("웹캠을 열 수 없습니다.")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # YOLO 모델로 프레임 처리
    results = model.predict(source=frame, save=False, show=False)  # 실시간 예측

    # 결과 처리 및 시각화
    annotated_frame = results[0].plot()  # 감지된 객체 그리기

    # 화면 출력
    cv2.imshow("YOLOv8 Real-Time Detection", annotated_frame)

    # ESC 키로 종료
    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()
