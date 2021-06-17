export function transformCookie(cookie,propertiRequeried){
    if(!cookie){
        return {}
    }
    const split = cookie.split(";")
    const arrayObjects = split.filter((element)=>{
        return element.indexOf(propertiRequeried) >= 0
    })
    const keyValue = arrayObjects[0].trim().split("=")
    if(keyValue[0] == propertiRequeried){
        let keyValueObj = {}
        keyValueObj[keyValue[0]] = keyValue[1]
        return keyValueObj
    }
    return arrayObjects
}