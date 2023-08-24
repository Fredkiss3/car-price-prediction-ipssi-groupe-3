import pandas as pd
import csv
from time import sleep
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.set_page_load_timeout(45)
driver.maximize_window()
driver.get("https://www.lacentrale.fr/listing")
wait = WebDriverWait(driver, 20)

def getAllLinksFromPages():
    
    finalLinks = []
    
    for i in range(50):
        url = "https://www.lacentrale.fr/listing?makesModelsCommercialNames=&options=&page=" + str(i+100)
        driver.get(url)
        driver.implicitly_wait(10)
        wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.Vehiculecard_Vehiculecard_vehiculeCard')));
        annoncesListPage = [annonce.get_attribute('href') for annonce in driver.find_elements(By.CSS_SELECTOR, '.Vehiculecard_Vehiculecard_vehiculeCard')]
        finalLinks.append(annoncesListPage)

    return sum(finalLinks, [])


def getAnnonceDetails(url):
    
    driver.get(url)
    # driver.execute_script("document.body.style.zoom='50%'")

    def retry_fetch(number_of_retries, wait_before_fetch):
        while number_of_retries > 0:
            driver.implicitly_wait(10)
            try:
                wait.until(EC.visibility_of_element_located((By.XPATH, "//*[@id='summary-information']/div")))
                return assembleAnnonce()
                break
            except:
                return assembleAnnonce()
                pass
            number_of_retries = number_of_retries - 1
    
    def check_and_get_by_css(css_selector):
        try:
            return driver.find_element(By.CSS_SELECTOR, css_selector).text
        except:
            return 'NaN'
    
     
    def assembleAnnonce():
        annonce = {}

        annonce['name'] = check_and_get_by_css('.SummaryInformation_title__5CYhW')
        annonce['price'] = check_and_get_by_css('.PriceInformation_classifiedPrice__b-Jae').encode("ascii", "ignore").decode().replace(" ", "")
        driver.execute_script("window.scrollTo(0,900)")
        driver.execute_script("document.body.style.zoom='70%'")
        sleep(5)
        annonce['origin'] = check_and_get_by_css('#origin .Item_content__Xyd3d')
        annonce['year'] = check_and_get_by_css('#year .Item_content__Xyd3d')
        annonce['date'] = check_and_get_by_css('#firstCirculationDate .Text_Text_body1')
        annonce['finition'] = check_and_get_by_css('#firstCirculationDate .Item_content__Xyd3d')            
        annonce['mileage'] = check_and_get_by_css('#mileage .Item_content__Xyd3d')
        annonce['energy'] = check_and_get_by_css('#energy .Item_content__Xyd3d')
        annonce['gearbox'] = check_and_get_by_css('#gearbox .Item_content__Xyd3d')
        annonce['color'] = check_and_get_by_css('#externalColor .Item_content__Xyd3d')
        annonce['seats'] = check_and_get_by_css('#seats .Item_content__Xyd3d')
        annonce['doors'] = check_and_get_by_css('#doors .Item_content__Xyd3d')
        annonce['length'] = check_and_get_by_css('#length .Item_content__Xyd3d')
        annonce['ratedHorsePower'] = check_and_get_by_css('#ratedHorsePower .Item_content__Xyd3d')
        annonce['powerDIN'] = check_and_get_by_css('#powerDIN .Item_content__Xyd3d')
        annonce['consumption'] = check_and_get_by_css('#consumption .Item_content__Xyd3d')
            
        return annonce    

    try:
        driver.implicitly_wait(10)
        wait.until(EC.visibility_of_element_located((By.XPATH, "//*[@id='summary-information']/div")))
        return assembleAnnonce()
    except:
        print("Element was not found")
        driver.refresh()
        return retry_fetch(5, 5)
        pass 
    

allAnnoncesUrls = getAllLinksFromPages()
print(allAnnoncesUrls)

allAnnonces = []

for idx, url in enumerate(allAnnoncesUrls):
    print(idx, url)
    annonceDetails = getAnnonceDetails(url)
    allAnnonces.append(annonceDetails) 

print(allAnnonces)

filtered = filter(lambda annonce: annonce != None, allAnnonces)

df = pd.DataFrame(list(filtered))
df.to_csv('annonces12.csv', index=False, header=True)