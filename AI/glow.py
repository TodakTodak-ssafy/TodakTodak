import os
from zipfile import ZipFile
from shutil import copyfile, rmtree
import requests
from pathlib import Path
import subprocess
import time

def learnGlowTTS():
    print("******************************** glow 학습 시작! ***********************************")

    # 현재 작업 디렉토리를 '/content/TTS'로 변경
    os.chdir('home/ubuntu/AIFlask/S10P12C210/content/TTS')

    # root = "home/ubuntu/AIFlask/S10P12C210/"

    # Google 드라이브에서 파일을 복사하여 로컬 디렉토리로 이동
    source_path = "home/ubuntu/AIFlask/S10P12C210/content/data/filelists.zip"
    destination_path = "./filelists.zip"

    if os.path.exists(source_path):
        try:
            copyfile(source_path, destination_path)
            print("파일 복사 성공")
        except Exception as e:
            print("파일 복사 중 오류 발생:", e)
    else:
        print("복사할 파일이 존재하지 않습니다.")

    # 기존에 있던 'filelists' 디렉토리 삭제
    directory_path = "./filelists"


    if os.path.exists(directory_path):
        try:
            rmtree(directory_path)
            print("디렉토리 삭제 성공")
        except Exception as e:
            print("디렉토리 삭제 중 오류 발생:", e)
    else:
        print("삭제할 디렉토리가 존재하지 않습니다.")

    # 'filelists.zip' 파일을 'filelists' 디렉토리로 압축 해제
    with ZipFile('filelists.zip', 'r') as zip_ref:
        zip_ref.extractall('./filelists')
        
    with open("/content/TTS/test_sentences.txt", mode="w") as f:
        f.write("""이 문장들은 모델 학습을 위해 사용하지 않은 문장들입니다.
                서울특별시 특허허가과 허가과장 허과장.
                경찰청 철창살은 외철창살이고 검찰청 철창살은 쌍철창살이다.
                지향을 지양으로 오기하는 일을 지양하는 언어 습관을 지향해야 한다.
                그러니까 외계인이 우리 생각을 읽고 우리 생각을 우리가 다시 생각토록 해서 그 생각이 마치 우리가 생각한 것인 것처럼 속였다는 거냐?""")

    # 파일 경로 지정
    file_path = 'home/ubuntu/AIFlask/S10P12C210/content/TTS/TTS/bin/train_glow_tts.py'

    # 수정할 텍스트
    old_text = 'with open(config.test_sentences_file, "r") as f:'
    new_text = 'with open(config.test_sentences_file, "r", encoding="utf-8") as f:'

    # 파일 열기 및 수정
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    modified_lines = []
    for line in lines:
        if old_text in line:
            line = line.replace(old_text, new_text)
        modified_lines.append(line)

    # 수정된 내용으로 파일 저장
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(modified_lines)


    # 실행할 명령어
    command = [
        'python', 'home/ubuntu/AIFlask/S10P12C210/TTS/TTS/bin/train_glow_tts.py',
        '--config_path', 'home/ubuntu/AIFlask/S10P12C210/content/data/glowtts-v2/config.json',
        '--coqpit.datasets.0.path', 'home/ubuntu/AIFlask/S10P12C210/content/TTS/filelists',
        '--coqpit.audio.stats_path', 'home/ubuntu/AIFlask/S10P12C210/content/data/glowtts-v2/scale_stats_new.npy',
        '--coqpit.test_sentences_file', 'home/ubuntu/AIFlask/S10P12C210/content/TTS/test_sentences.txt',
        '--coqpit.output_path', 'home/ubuntu/AIFlask/S10P12C210/content/data/glowtts-v2/',
        '--coqpit.num_loader_workers', '2',
        '--coqpit.num_val_loader_workers', '2',
        '--restore_path', 'home/ubuntu/AIFlask/S10P12C210/content/data/glowtts-v2/model_file.pth.tar'
    ]

    # 명령어 실행
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, error = process.communicate()

    time.sleep(30) # 5분 대기

    # 실행 결과 출력
    # if process.returncode == 0:
    print("******************************** glow 학습 종료! ***********************************")
    # else:
    #     print("학습 에러!", error.decode())

