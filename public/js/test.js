const formData = document.querySelector('form')
const inputData = document.querySelector('input')
const merror = document.querySelector('#message-error')
const mdata = document.querySelector('#message-data')

formData.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address = inputData.value
    merror.textContent = ""
    mdata.textContent = "Loading ..."
    //fetch API used to request data from server, It is available on all modern browsers.
    //this can be used only in client side javascript file and not available in node.js
    fetch('/weather?address='+address).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                merror.textContent = data.error
                mdata.textContent = ""
                return
            }
            mdata.textContent = 'Temperature: ' + data.Temperature + ' ' + 'Feels Like: ' + data.FeelsLikeTemperature + ' ' + 'Place: ' + data.Address
            merror.textContent = ""
            //console.log('Temperature: ' + data.Temperature + ' ' + 'Feels Like: ' + data.FeelsLikeTemperature + ' ' + 'Place: ' + data.Address)
        })
    })

})

