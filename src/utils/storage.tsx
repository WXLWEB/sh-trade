const optional = 'ZG-optional'

const getStorage: any = () => {
  const str = localStorage.getItem(optional);
  return JSON.parse(str);
}

const setStorage = (val: any) => {
  localStorage.setItem(optional, val)
}

const addStorage = (addVal:any) => {
  let oldVal = getStorage(optional)
  let newVal;
  if(oldVal instanceof Array){
    newVal = oldVal.concat(addVal)
  }else {
    newVal = []
    newVal.push(addVal)
  }
  setStorage(JSON.stringify(newVal))
}

const removeStorage = (val: any) => {
  let oldVal = getStorage(optional)
  if(oldVal instanceof Array){
    const index = oldVal.indexOf(val)
    oldVal.splice(index, 1);
  }
  setStorage(JSON.stringify(oldVal))
}

export {
  getStorage,
  setStorage,
  addStorage,
  removeStorage
}
