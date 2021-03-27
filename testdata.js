const { xml2js } = require('xml-js');

exports.testdata = `
<?xml version='1.0' encoding='ISO-8859-1'?>
 <siteData xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://dd.weather.gc.ca/citypage_weather/schema/site.xsd">
 <license>https://dd.weather.gc.ca/doc/LICENCE_GENERAL.txt</license>
 <dateTime name="xmlCreation" zone="UTC" UTCOffset="0">
 <year>2021</year>
 <month name="January">01</month>
 <day name="Wednesday">27</day>
 <hour>15</hour>
 <minute>23</minute>
 <timeStamp>20210127152300</timeStamp>
 <textSummary>Wednesday January 27, 2021 at 15:23 UTC</textSummary>
 </dateTime>
 <dateTime name="xmlCreation" zone="EST" UTCOffset="-5">
 <year>2021</year>
 <month name="January">01</month>
 <day name="Wednesday">27</day>
 <hour>10</hour>
 <minute>23</minute>
 <timeStamp>20210127102300</timeStamp>
 <textSummary>Wednesday January 27, 2021 at 10:23 EST</textSummary>
 </dateTime>
 <location>
 <continent>North America</continent>
 <country code="ca">Canada</country>
 <province code="on">Ontario</province>
 <name code="s0000785" lat="43.63N" lon="79.37W">Toronto Island</name>
 <region>City of Toronto</region>
 </location>
 <warnings/>
 <currentConditions>
 <station code="ytz" lat="43.63N" lon="79.4W">Toronto City Centre Airport</station>
 <dateTime name="observation" zone="UTC" UTCOffset="0">
 <year>2021</year>
 <month name="January">01</month>
 <day name="Wednesday">27</day>
 <hour>15</hour>
 <minute>00</minute>
 <timeStamp>20210127150000</timeStamp>
 <textSummary>Wednesday January 27, 2021 at 15:00 UTC</textSummary>
 </dateTime>
 <dateTime name="observation" zone="EST" UTCOffset="-5">
 <year>2021</year>
 <month name="January">01</month>
 <day name="Wednesday">27</day>
 <hour>10</hour>
 <minute>00</minute>
 <timeStamp>20210127100000</timeStamp>
 <textSummary>Wednesday January 27, 2021 at 10:00 EST</textSummary>
 </dateTime>
 <condition>Partly Cloudy</condition>
 <iconCode format="gif">02</iconCode>
 <temperature unitType="metric" units="C">-3.5</temperature>
 <dewpoint unitType="metric" units="C">-8.2</dewpoint>
 <windChill unitType="metric">-9</windChill>
 <pressure unitType="metric" units="kPa" change="" tendency="">102.4</pressure>
 <visibility unitType="metric" units="km">16.1</visibility>
 <relativeHumidity units="%">70</relativeHumidity>
 <wind>
 <speed unitType="metric" units="km/h">18</speed>
 <gust unitType="metric" units="km/h">28</gust>
 <direction>NW</direction>
 <bearing units="degrees">320.0</bearing>
 </wind>
 </currentConditions>
 <forecastGroup>
 <dateTime name="forecastIssue" zone="UTC" UTCOffset="0">
 <year>2021</year>
 <month name="January">01</month>
 <day name="Wednesday">27</day>
 <hour>10</hour>
 <minute>00</minute>
 <timeStamp>20210127100000</timeStamp>
 <textSummary>Wednesday January 27, 2021 at 10:00 UTC</textSummary>
 </dateTime>
 <dateTime name="forecastIssue" zone="EST" UTCOffset="-5">
 <year>2021</year>
 <month name="January">01</month>
 <day name="Wednesday">27</day>
 <hour>05</hour>
 <minute>00</minute>
 <timeStamp>20210127050000</timeStamp>
 <textSummary>Wednesday January 27, 2021 at 05:00 EST</textSummary>
 </dateTime>
 <regionalNormals>
 <textSummary>Low minus 10. High minus 2.</textSummary>
 <temperature unitType="metric" units="C" class="high">-2</temperature>
 <temperature unitType="metric" units="C" class="low">-10</temperature>
 </regionalNormals>
 <forecast>
 <period textForecastName="Today">Wednesday</period>
 <textSummary>Cloudy. Wind becoming northwest 20 km/h gusting to 40 this morning. High minus 3. Wind chill near minus 13. UV index 1 or low.</textSummary>
 <cloudPrecip>
 <textSummary>Cloudy.</textSummary>
 </cloudPrecip>
 <abbreviatedForecast>
 <iconCode format="gif">10</iconCode>
 <pop units="%"/>
 <textSummary>Cloudy</textSummary>
 </abbreviatedForecast>
 <temperatures>
 <textSummary>High minus 3.</textSummary>
 <temperature unitType="metric" units="C" class="high">-3</temperature>
 </temperatures>
 <winds>
 <textSummary>Wind becoming northwest 20 km/h gusting to 40 this morning.</textSummary>
 <wind index="1" rank="major">
 <speed unitType="metric" units="km/h">10</speed>
 <gust unitType="metric" units="km/h">00</gust>
 <direction>NW</direction>
 <bearing units="degrees">32</bearing>
 </wind>
 <wind index="2" rank="major">
 <speed unitType="metric" units="km/h">20</speed>
 <gust unitType="metric" units="km/h">40</gust>
 <direction>NW</direction>
 <bearing units="degrees">32</bearing>
 </wind>
 <wind index="3" rank="minor">
 <speed unitType="metric" units="km/h">20</speed>
 <gust unitType="metric" units="km/h">00</gust>
 <direction>NW</direction>
 <bearing units="degrees">32</bearing>
 </wind>
 </winds>
 <humidex/>
 <precipitation>
 <textSummary/>
 <precipType start="" end=""/>
 </precipitation>
 <windChill>
 <textSummary>Wind chill near minus 13.</textSummary>
 <calculated unitType="metric" class="near">-13</calculated>
 <frostbite/>
 </windChill>
 <uv category="low">
 <index>1</index>
 <textSummary>UV index 1 or low.</textSummary>
 </uv>
 <relativeHumidity units="%">65</relativeHumidity>
 </forecast>
 <forecast>
 <period textForecastName="Tonight">Wednesday night</period>
 <textSummary>Cloudy. Wind north 20 km/h gusting to 40. Low minus 10. Wind chill minus 12 this evening and minus 17 overnight.</textSummary>
 <cloudPrecip>
 <textSummary>Cloudy.</textSummary>
 </cloudPrecip>
 <abbreviatedForecast>
 <iconCode format="gif">10</iconCode>
 <pop units="%"/>
 <textSummary>Cloudy</textSummary>
 </abbreviatedForecast>
 <temperatures>
 <textSummary>Low minus 10.</textSummary>
 <temperature unitType="metric" units="C" class="low">-10</temperature>
 </temperatures>
 <winds>
 <textSummary>Wind north 20 km/h gusting to 40.</textSummary>
 <wind index="1" rank="major">
 <speed unitType="metric" units="km/h">20</speed>
 <gust unitType="metric" units="km/h">00</gust>
 <direction>NW</direction>
 <bearing units="degrees">32</bearing>
 </wind>
 <wind index="2" rank="major">
 <speed unitType="metric" units="km/h">20</speed>
 <gust unitType="metric" units="km/h">40</gust>
 <direction>NW</direction>
 <bearing units="degrees">32</bearing>
 </wind>
 <wind index="3" rank="minor">
 <speed unitType="metric" units="km/h">20</speed>
 <gust unitType="metric" units="km/h">40</gust>
 <direction>N</direction>
 <bearing units="degrees">36</bearing>
 </wind>
 <wind index="4" rank="minor">
 <speed unitType="metric" units="km/h">20</speed>
 <gust unitType="metric" units="km/h">00</gust>
 <direction>N</direction>
 <bearing units="degrees">36</bearing>
 </wind>
 <wind index="5" rank="minor">
 <speed unitType="metric" units="km/h">10</speed>
 <gust unitType="metric" units="km/h">00</gust>
 <direction>N</direction>
 <bearing units="degrees">36</bearing>
 </wind>
 </winds>
 <humidex/>
 <precipitation>
 <textSummary/>
 <precipType start="" end=""/>
 </precipitation>
 <windChill>
 <textSummary>Wind chill minus 12 this evening and minus 17 overnight.</textSummary>
 <calculated index="1" unitType="metric" class="evening">-12</calculated>
 <calculated index="2" unitType="metric" class="overnight">-17</calculated>
 <frostbite/>
 </windChill>
 <relativeHumidity units="%">60</relativeHumidity>
 </forecast>
 <forecast>
 <period textForecastName="Thursday">Thursday</period>
 <textSummary>Mainly cloudy. Wind becoming northwest 20 km/h gusting to 40 in the morning. High minus 7. Wind chill near minus 18. UV index 1 or low.</textSummary>
 <cloudPrecip>
 <textSummary>Mainly cloudy.</textSummary>
 </cloudPrecip>
 <abbreviatedForecast>
 <iconCode format="gif">03</iconCode>
 <pop units="%"/>
 <textSummary>Mainly cloudy</textSummary>
 </abbreviatedForecast>
 <temperatures>
 <textSummary>High minus 7.</textSummary>
 <temperature unitType="metric" units="C" class="high">-7</temperature>
 </temperatures>
 <winds>
 <textSummary>Wind becoming northwest 20 km/h gusting to 40 in the morning.</textSummary>
 <wind index="1" rank="major">
 <speed unitType="metric" units="km/h">10</speed>
 <gust unitType="metric" units="km/h">00</gust>
 <direction>NW</direction>
 <bearing units="degrees">32</bearing>
 </wind>
 <wind index="2" rank="major">
 <speed unitType="metric" units="km/h">20</speed>
 <gust unitType="metric" units="km/h">00</gust>
 <direction>NW</direction>
 <bearing units="degrees">32</bearing>
 </wind>
 <wind index="3" rank="minor">
 <speed unitType="metric" units="km/h">20</speed>
 <gust unitType="metric" units="km/h">40</gust>
 <direction>NW</direction>
 <bearing units="degrees">32</bearing>
 </wind>
 </winds>
 <humidex/>
 <precipitation>
 <textSummary/>
 <precipType start="" end=""/>
 </precipitation>
 <windChill>
 <textSummary>Wind chill near minus 18.</textSummary>
 <calculated unitType="metric" class="near">-18</calculated>
 <frostbite/>
 </windChill>
 <uv category="low">
 <index>1</index>
 <textSummary>UV index 1 or low.</textSummary>
 </uv>
 <relativeHumidity units="%">50</relativeHumidity>
 </forecast>
 <forecast>
 <period textForecastName="Thursday night">Thursday night</period>
 <textSummary>Cloudy periods with 60 percent chance of flurries. Low minus 15.</textSummary>
 <cloudPrecip>
 <textSummary>Cloudy periods with 60 percent chance of flurries.</textSummary>
 </cloudPrecip>
 <abbreviatedForecast>
 <iconCode format="gif">38</iconCode>
 <pop units="%">60</pop>
 <textSummary>Chance of flurries</textSummary>
 </abbreviatedForecast>
 <temperatures>
 <textSummary>Low minus 15.</textSummary>
 <temperature unitType="metric" units="C" class="low">-15</temperature>
 </temperatures>
 <winds/>
 <humidex/>
 <precipitation>
 <textSummary/>
 <precipType start="47" end="59">snow</precipType>
 </precipitation>
 <relativeHumidity units="%">80</relativeHumidity>
 </forecast>
 <forecast>
 <period textForecastName="Friday">Friday</period>
 <textSummary>A mix of sun and cloud. High minus 7.</textSummary>
 <cloudPrecip>
 <textSummary>A mix of sun and cloud.</textSummary>
 </cloudPrecip>
 <abbreviatedForecast>
 <iconCode format="gif">02</iconCode>
 <pop units="%"/>
 <textSummary>A mix of sun and cloud</textSummary>
 </abbreviatedForecast>
 <temperatures>
 <textSummary>High minus 7.</textSummary>
 <temperature unitType="metric" units="C" class="high">-7</temperature>
 </temperatures>
 <winds/>
 <humidex/>
 <precipitation>
 <textSummary/>
 <precipType start="" end=""/>
 </precipitation>
 <relativeHumidity units="%">60</relativeHumidity>
 </forecast>
 <forecast>
 <period textForecastName="Friday night">Friday night</period>
 <textSummary>Cloudy periods. Low minus 15.</textSummary>
 <cloudPrecip>
 <textSummary>Cloudy periods.</textSummary>
 </cloudPrecip>
 <abbreviatedForecast>
 <iconCode format="gif">32</iconCode>
 <pop units="%"/>
 <textSummary>Cloudy periods</textSummary>
 </abbreviatedForecast>
 <temperatures>
 <textSummary>Low minus 15.</textSummary>
 <temperature unitType="metric" units="C" class="low">-15</temperature>
 </temperatures>
 <winds/>
 <humidex/>
 <precipitation>
 <textSummary/>
 <precipType start="" end=""/>
 </precipitation>
 <relativeHumidity units="%">85</relativeHumidity>
 </forecast>
 <forecast>
 <period textForecastName="Saturday">Saturday</period>
 <textSummary>A mix of sun and cloud. High minus 6.</textSummary>
 <cloudPrecip>
 <textSummary>A mix of sun and cloud.</textSummary>
 </cloudPrecip>
 <abbreviatedForecast>
 <iconCode format="gif">02</iconCode>
 <pop units="%"/>
 <textSummary>A mix of sun and cloud</textSummary>
 </abbreviatedForecast>
 <temperatures>
 <textSummary>High minus 6.</textSummary>
 <temperature unitType="metric" units="C" class="high">-6</temperature>
 </temperatures>
 <winds/>
 <humidex/>
 <precipitation>
 <textSummary/>
 <precipType start="" end=""/>
 </precipitation>
 <relativeHumidity units="%">55</relativeHumidity>
 </forecast>
 <forecast>
 <period textForecastName="Saturday night">Saturday night</period>
 <textSummary>Cloudy. Low minus 9.</textSummary>
 <cloudPrecip>
 <textSummary>Cloudy.</textSummary>
 </cloudPrecip>
 <abbreviatedForecast>
 <iconCode format="gif">10</iconCode>
 <pop units="%"/>
 <textSummary>Cloudy</textSummary>
 </abbreviatedForecast>
 <temperatures>
 <textSummary>Low minus 9.</textSummary>
 <temperature unitType="metric" units="C" class="low">-9</temperature>
 </temperatures>
 <winds/>
 <humidex/>
 <precipitation>
 <textSummary/>
 <precipType start="" end=""/>
 </precipitation>
 <relativeHumidity units="%">80</relativeHumidity>
 </forecast>
 <forecast>
 <period textForecastName="Sunday">Sunday</period>
 <textSummary>Cloudy with 60 percent chance of flurries. High minus 4.</textSummary>
 <cloudPrecip>
 <textSummary>Cloudy with 60 percent chance of flurries.</textSummary>
 </cloudPrecip>
 <abbreviatedForecast>
 <iconCode format="gif">16</iconCode>
 <pop units="%">60</pop>
 <textSummary>Chance of flurries</textSummary>
 </abbreviatedForecast>
 <temperatures>
 <textSummary>High minus 4.</textSummary>
 <temperature unitType="metric" units="C" class="high">-4</temperature>
 </temperatures>
 <winds/>
 <humidex/>
 <precipitation>
 <textSummary/>
 <precipType start="108" end="119">snow</precipType>
 </precipitation>
 <relativeHumidity units="%">80</relativeHumidity>
 </forecast>
 <forecast>
 <period textForecastName="Sunday night">Sunday night</period>
 <textSummary>Snow. Low minus 5.</textSummary>
 <cloudPrecip>
 <textSummary>Snow.</textSummary>
 </cloudPrecip>
 <abbreviatedForecast>
 <iconCode format="gif">17</iconCode>
 <pop units="%"/>
 <textSummary>Snow</textSummary>
 </abbreviatedForecast>
 <temperatures>
 <textSummary>Low minus 5.</textSummary>
 <temperature unitType="metric" units="C" class="low">-5</temperature>
 </temperatures>
 <winds/>
 <humidex/>
 <precipitation>
 <textSummary/>
 <precipType start="119" end="131">snow</precipType>
 </precipitation>
 <relativeHumidity units="%">85</relativeHumidity>
 </forecast>
 <forecast>
 <period textForecastName="Monday">Monday</period>
 <textSummary>Periods of snow. High minus 2.</textSummary>
 <cloudPrecip>
 <textSummary>Periods of snow.</textSummary>
 </cloudPrecip>
 <abbreviatedForecast>
 <iconCode format="gif">16</iconCode>
 <pop units="%"/>
 <textSummary>Periods of snow</textSummary>
 </abbreviatedForecast>
 <temperatures>
 <textSummary>High minus 2.</textSummary>
 <temperature unitType="metric" units="C" class="high">-2</temperature>
 </temperatures>
 <winds/>
 <humidex/>
 <precipitation>
 <textSummary/>
 <precipType start="131" end="143">snow</precipType>
 </precipitation>
 <relativeHumidity units="%">80</relativeHumidity>
 </forecast>
 <forecast>
 <period textForecastName="Monday night">Monday night</period>
 <textSummary>Cloudy. Low minus 6.</textSummary>
 <cloudPrecip>
 <textSummary>Cloudy.</textSummary>
 </cloudPrecip>
 <abbreviatedForecast>
 <iconCode format="gif">10</iconCode>
 <pop units="%"/>
 <textSummary>Cloudy</textSummary>
 </abbreviatedForecast>
 <temperatures>
 <textSummary>Low minus 6.</textSummary>
 <temperature unitType="metric" units="C" class="low">-6</temperature>
 </temperatures>
 <winds/>
 <humidex/>
 <precipitation>
 <textSummary/>
 <precipType start="143" end="144">snow</precipType>
 </precipitation>
 <relativeHumidity units="%">75</relativeHumidity>
 </forecast>
 <forecast>
 <period textForecastName="Tuesday">Tuesday</period>
 <textSummary>A mix of sun and cloud. High minus 1.</textSummary>
 <cloudPrecip>
 <textSummary>A mix of sun and cloud.</textSummary>
 </cloudPrecip>
 <abbreviatedForecast>
 <iconCode format="gif">02</iconCode>
 <pop units="%"/>
 <textSummary>A mix of sun and cloud</textSummary>
 </abbreviatedForecast>
 <temperatures>
 <textSummary>High minus 1.</textSummary>
 <temperature unitType="metric" units="C" class="high">-1</temperature>
 </temperatures>
 <winds/>
 <humidex/>
 <precipitation>
 <textSummary/>
 <precipType start="" end=""/>
 </precipitation>
 <relativeHumidity units="%">70</relativeHumidity>
 </forecast>
 </forecastGroup>
 <hourlyForecastGroup>
 <dateTime name="forecastIssue" zone="UTC" UTCOffset="0">
 <year>2021</year>
 <month name="January">01</month>
 <day name="Wednesday">27</day>
 <hour>10</hour>
 <minute>00</minute>
 <timeStamp>20210127100000</timeStamp>
 <textSummary>Wednesday January 27, 2021 at 10:00 UTC</textSummary>
 </dateTime>
 <dateTime name="forecastIssue" zone="EST" UTCOffset="-5">
 <year>2021</year>
 <month name="January">01</month>
 <day name="Wednesday">27</day>
 <hour>05</hour>
 <minute>00</minute>
 <timeStamp>20210127050000</timeStamp>
 <textSummary>Wednesday January 27, 2021 at 05:00 EST</textSummary>
 </dateTime>
 <hourlyForecast dateTimeUTC="202101271600">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-4</temperature>
 <lop category="Low" units="%">10</lop>
 <windChill unitType="metric">-10</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101271700">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-4</temperature>
 <lop category="Low" units="%">10</lop>
 <windChill unitType="metric">-10</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101271800">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-3</temperature>
 <lop category="Low" units="%">10</lop>
 <windChill unitType="metric">-9</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101271900">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-4</temperature>
 <lop category="Low" units="%">10</lop>
 <windChill unitType="metric">-10</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101272000">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-4</temperature>
 <lop category="Low" units="%">10</lop>
 <windChill unitType="metric">-10</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101272100">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-5</temperature>
 <lop category="Low" units="%">10</lop>
 <windChill unitType="metric">-12</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101272200">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-5</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-12</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101272300">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-5</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-12</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101280000">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-5</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-12</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101280100">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-6</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-13</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101280200">
 <condition>Mainly cloudy</condition>
 <iconCode format="png">33</iconCode>
 <temperature unitType="metric" units="C">-6</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-13</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h">40</gust>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101280300">
 <condition>Mainly cloudy</condition>
 <iconCode format="png">33</iconCode>
 <temperature unitType="metric" units="C">-7</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-14</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="North">N</direction>
 <gust unitType="metric" units="km/h">40</gust>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101280400">
 <condition>Mainly cloudy</condition>
 <iconCode format="png">33</iconCode>
 <temperature unitType="metric" units="C">-7</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-14</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="North">N</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101280500">
 <condition>Mainly cloudy</condition>
 <iconCode format="png">33</iconCode>
 <temperature unitType="metric" units="C">-8</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-15</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="North">N</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101280600">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-8</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-15</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="North">N</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101280700">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-9</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-17</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="North">N</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101280800">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-9</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-17</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="North">N</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101280900">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-9</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-17</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="North">N</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101281000">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-10</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-15</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">10</speed>
 <direction windDirFull="North">N</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101281100">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-10</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-15</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">10</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101281200">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-10</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-15</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">10</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101281300">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-10</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-15</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">10</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101281400">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-10</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-18</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 <hourlyForecast dateTimeUTC="202101281500">
 <condition>Cloudy</condition>
 <iconCode format="png">10</iconCode>
 <temperature unitType="metric" units="C">-10</temperature>
 <lop category="Low" units="%">20</lop>
 <windChill unitType="metric">-18</windChill>
 <humidex unitType="metric"/>
 <wind>
 <speed unitType="metric" units="km/h">20</speed>
 <direction windDirFull="Northwest">NW</direction>
 <gust unitType="metric" units="km/h"/>
 </wind>
 </hourlyForecast>
 </hourlyForecastGroup>
 <yesterdayConditions>
 <temperature unitType="metric" units="C" class="high">1.5</temperature>
 <temperature unitType="metric" units="C" class="low">-3.7</temperature>
 <precip unitType="metric" units="mm">2.7</precip>
 </yesterdayConditions>
 <riseSet>
 <disclaimer>The information provided here, for the times of the rise and set of the sun, is an estimate included as a convenience to our clients. Values shown here may differ from the official sunrise/sunset data available from (http://hia-iha.nrc-cnrc.gc.ca/sunrise_e.html)</disclaimer>
 <dateTime name="sunrise" zone="UTC" UTCOffset="0">
 <year>2021</year>
 <month name="January">01</month>
 <day name="Wednesday">27</day>
 <hour>12</hour>
 <minute>39</minute>
 <timeStamp>20210127123900</timeStamp>
 <textSummary>Wednesday January 27, 2021 at 12:39 UTC</textSummary>
 </dateTime>
 <dateTime name="sunrise" zone="EST" UTCOffset="-5">
 <year>2021</year>
 <month name="January">01</month>
 <day name="Wednesday">27</day>
 <hour>07</hour>
 <minute>39</minute>
 <timeStamp>20210127073900</timeStamp>
 <textSummary>Wednesday January 27, 2021 at 07:39 EST</textSummary>
 </dateTime>
 <dateTime name="sunset" zone="UTC" UTCOffset="0">
 <year>2021</year>
 <month name="January">01</month>
 <day name="Wednesday">27</day>
 <hour>22</hour>
 <minute>21</minute>
 <timeStamp>20210127222100</timeStamp>
 <textSummary>Wednesday January 27, 2021 at 22:21 UTC</textSummary>
 </dateTime>
 <dateTime name="sunset" zone="EST" UTCOffset="-5">
 <year>2021</year>
 <month name="January">01</month>
 <day name="Wednesday">27</day>
 <hour>17</hour>
 <minute>21</minute>
 <timeStamp>20210127172100</timeStamp>
 <textSummary>Wednesday January 27, 2021 at 17:21 EST</textSummary>
 </dateTime>
 </riseSet>
 <almanac>
 <temperature class="extremeMax" period="2006-2014" unitType="metric" units="C" year="2012">5.2</temperature>
 <temperature class="extremeMin" period="2006-2014" unitType="metric" units="C" year="2014">-15.4</temperature>
 <temperature class="normalMax" unitType="metric" units="C"/>
 <temperature class="normalMin" unitType="metric" units="C"/>
 <temperature class="normalMean" unitType="metric" units="C"/>
 <precipitation class="extremeRainfall" period="-" unitType="metric" units="mm" year=""/>
 <precipitation class="extremeSnowfall" period="-" unitType="metric" units="cm" year=""/>
 <precipitation class="extremePrecipitation" period="2006-2014" unitType="metric" units="mm" year="2012">12.6</precipitation>
 <precipitation class="extremeSnowOnGround" period="-" unitType="metric" units="cm" year=""/>
 <pop units="%"/>
 </almanac>
 </siteData>
`
exports.testdatajs = xml2js(this.testdata);
