import {airQuality} from './airQualityService.js'
import {reply} from './reply.js'

export async function replyAirQuality({replyToken, message}){
    let latitude = message.latitude;
    let longitude = message.longitude;
    const air_quality = await airQuality({latitude,longitude})
    const airData = {
        city: air_quality.data.city,
        state: air_quality.data.state,
        country: air_quality.data.country,
        timestamp: air_quality.data.current.weather.ts,
        temperature: air_quality.data.current.weather.tp,
        humidity: air_quality.data.current.weather.hu,
        windSpeed: air_quality.data.current.weather.ws,
        aqius:  air_quality.data.current.pollution.aqius,
        iconIndex: air_quality.data.current.weather.ic
    }
    let aqiMessage;
    if(airData.aqius <= 50){
        aqiMessage = "อากาศดีมากเลย น่าออกไปหาอะไรทำซักอย่างนะ"
    }else if(airData.aqius <= 80){
        aqiMessage = "อากาศดีนะ อยากไปเที่ยวซักที่จัง"
    }else if(airData.aqius <= 120){
        aqiMessage = "อากาศดีปานกลาง ระวังฝุ่นหน่อยก็ดีนะ"
    }else if(airData.aqius <= 180){
        aqiMessage = "อากาศไม่ค่อยดีเลย ดูแลตัวเองด้วยนะ"
    }else{
        aqiMessage = "อากาศแย่มากเลย อย่าออกไปข้างนอกเลยนะคนดี"
    }
    const msg = [{
        type: "flex",
        altText: "Weather Report",
        contents: {
            type: "bubble",
            header: {
                type: "box",
                layout: "vertical",
                contents: [
                {
                    type: "text",
                    text: `Weather Report`,
                    size: "lg",
                    wrap: true
                }
                ]
            },
            hero: {
                type: "image",
                url: `https://www.airvisual.com/images/${airData.iconIndex}.png`,
                size: "lg",
                aspectRatio: "2:2"
            },
            body: {
                type: "box",
                layout: "vertical",
                contents: [
                {
                    type: "text",
                    text: `AQI: ${airData.aqius}\n(${aqiMessage})`,
                    size: "md",
                    wrap: true
                },
                {
                    type: "text",
                    text: `Temperature: ${airData.temperature}ºC`,
                    size: "md",
                    wrap: true
                },
                {
                    type: "text",
                    text: `${Date(airData.timestamp)}`,
                    size: "md",
                    wrap: true
                },
                ]
            }
        }
    }]
    await reply(replyToken, msg);
  }