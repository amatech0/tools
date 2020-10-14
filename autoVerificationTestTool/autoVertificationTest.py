from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from retrying import retry

import datetime
import time 
import csv

targetURL = "noUrl"
user = "noUser"
pas = "noPass"
log_filename = "noName"
stopcount = 0
checkendflg = False

@retry(stop_max_attempt_number=3,wait_fixed=2000)
def setEmpNo(browser,wait,targetName,line):
    element = wait.until(EC.visibility_of_element_located((By.NAME,targetName)))
    element.send_keys(line[0])

@retry(stop_max_attempt_number=3,wait_fixed=2000)
def clickLinkText(browser,wait,targetLinkText):
    element = wait.until(EC.visibility_of_element_located((By.LINK_TEXT,targetLinkText)))
    browser.execute_script("arguments[0].click();",element)

@retry(stop_max_attempt_number=3,wait_fixed=2000)
def clickName(browser,wait,targetName):
    element = wait.until(EC.visibility_of_element_located((By.NAME,targetName)))
    browser.execute_script("arguments[0].click();",element)

@retry(stop_max_attempt_number=3,wait_fixed=2000)
def clickPartialLinkText(browser,wait,targetPartialLinkText):
    element = wait.until(EC.visibility_of_element_located((By.PARTIAL_LINK_TEXT,targetPartialLinkText)))
    browser.execute_script("arguments[0].click();",element)

@retry(stop_max_attempt_number=3,wait_fixed=2000)
def clickId(browser,wait,targetId):
    element = wait.until(EC.visibility_of_element_located((By.ID,targetId)))
    browser.execute_script("arguments[0].click();",element)


def clickBrock(browser,wait,line):
    clickLinkText(browser,wait,"AAAAA")
    setEmpNo(browser,wait,"BBB.CCC.DDD.0",line)
    clickName(browser,wait,"EEE.FFF.GGG.nullobj")
    clickLinkText(browser,wait,"HHH")
    clickName(browser,wait,"III.JJJ.KKK.0")
    clickPartialLinkText(browser,wait,"LLL")
    clickName(browser,wait,"MMM.OOO")
    clickId(browser,wait,"PPP")
    clickName(browser,wait,"QQQ.RRR")
    clickName(browser,wait,"SSS.TTT")
    clickLinkText(browser,wait,"UUU")


def accessURL():
    print("接続先のURLを入力してください。")
    global targetURL
    targetURL = input('URL:')
    
    print("ユーザIDを入力してください")
    global user
    user = input('user_number:')
    
    print("パスワードを入力してください")
    global pas
    pas = input('password:')

def mainproc():
    start = time.time()
    
    browser = webdriver.Firefox()
    browser.get(targetURL)
    
    now = datetime.datetime.now()
    global log_filename
    log_filename = "executelog_{0:%Y%m%d%H%M%S}.txt".format(now)

    try:
        global stopcount
        element = browser.find_element_by_name("uid")
        element.send_keys(user)
        element = browser.find_element_by_name("pwd")
        element.send_keys(pas)
        element = browser.find_element_by_name("Login")
        element.click()

        wait = WebDriverWait(browser,30)
        count = 0
        with open(log_filename,"w") as log:

            try:
                emp_csv = open('emplist.csv')
                emplist = csv.reader(emp_csv)

                for line in emplist:
                    if(stopcount <= count):
                        print(line[0],file=log)
                        now = datetime.datetime.now()
                        print("start",file=log)
                        print(now,file=log)
                        
                        clickBrock(browser,wait,line)
                        print("end",file=log)
                        now = datetime.datetime.now()
                        print(now,file=log)
                        time.sleep(2)

                    count = count + 1
                global checkendflg
                checkendflg = True


            finally:
                 end = time.time() - start
                 print("実行時間",file=log)
                 print(end,file=log)
                 emp_csv.close()
                 log.close()
    
    except:
        import traceback
        with open(log_filename, 'a') as f:
            traceback.print_exc()
            print("エラー情報",file=f)
            traceback.print_exc(file=f)
            stopcount = count
            print("stopcount",file=f)
            print(stopcount,file=f)
            print("endflg",file=f)
            print(checkendflg,file=f)
        f.close()
        stopcount = count
        browser.close()
        raise
        pass

def main():
    accessURL()
    while(True):
        try:
            mainproc()
            if(checkendflg == True):
                with open(log_filename, 'a') as f:
                    print("succeed end",file=f)
                f.close()
                break
        except:
            if(checkendflg == True):
                with open(log_filename, 'a') as f:
                    print("succeed end",file=f)
                f.close()
                break
            with open(log_filename, 'a') as f:
                print("continue",file=f)
            f.close()
            pass

main()
