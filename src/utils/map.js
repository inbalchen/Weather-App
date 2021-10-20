import cloud from '../assets/images/cloud.svg'
import moon from '../assets/images/moon.svg'
import sun from '../assets/images/sunny.svg'
import partlysun from '../assets/images/sun-part-most.svg'
import partlynight from '../assets/images/part-night.svg'
import rain from '../assets/images/rain.svg'

export const Days = {
    '0': 'Sunday',
    '1': 'Monday',
    '2': 'Tuesday',
    '3': 'Wednesday',
    '4': 'Thursday'
}


export const dayIcons = (condition) => {
    console.log(condition)
    if(condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm') | condition.toLowerCase().includes('shower')){
        return rain
    }else if(condition.toLowerCase().includes('part') || condition.toLowerCase().includes('most') || condition.toLowerCase().includes('inter')){
        return partlysun
    }else if(condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('drear')){
        return partlysun
    }else if(condition.toLowerCase().includes('sun')){
        return sun
    }
}

export const nightIcons = (condition) => {
    if(condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('shower')){
        return rain
    }else if(condition.toLowerCase().includes('part') || condition.toLowerCase().includes('most') || condition.toLowerCase().includes('inter')){
        return partlynight
    }else if(condition.toLowerCase().includes('clear')){
        return moon
    }else if(condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('drear')){
        return cloud
    }
}
