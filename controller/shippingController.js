const trackingService = require("../service/trackingService")

const submitShipping = async (req, res) => {
    console.log('Received shipping request:', req.body);
    try {

        const { 
            dateOfShipping,
            dateOfDelivery,
            senderCountry,
            receiverCountry,
            receiverName,
            receiverSurname,
            sendAddress,
            sendState,
            senderCity,
            receiverCity,        
            receiverPhone,
            receivePostCode,
            receiveAddress,
            receiveState,
            sendPostCode,
            senderPhone,
            qty,
            content,
            service,
            weight,
            date,
            location,
            details,
            activities,
        
        } = req.body;
        const trackingNumber = trackingService.generateUniqueTrackingNumber();

        const result = await trackingService.saveTrackingInfo(trackingNumber, {
            dateOfShipping,
            dateOfDelivery,
            senderCountry,
            receiverCountry,
            receiverName,
            receiverSurname,
            sendAddress,
            sendState,
            senderCity,
            receiverCity,        
            receiverPhone,
            receivePostCode,
            receiveAddress,
            receiveState,
            sendPostCode,
            senderPhone,
            qty,
            content,
            service,
            weight,
            date,
            location,
            details,
            activities,
            trackingNumber
        });

        console.log('Shipping info saved. Response:', result);
      return res.json(result);
    } catch (error) {
        console.error('Error submitting shipping:', error);
       return res.status(500).json({ error: error.message });
    }
};

const shipList = async(req, res)=>{

    try {
            const shipping = await trackingService.getShippingList()
            console.log("shipping",shipping)
            res.json(shipping)

    } catch (error) {
        console.error("Error fetching shipping info", error)
        res.status(500).json({error: error.message})
    }
}


module.exports = {
    submitShipping,
    shipList
};