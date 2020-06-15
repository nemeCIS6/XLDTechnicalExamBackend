class jsonResponder{

    static success(data, message = "no custom message provided"){
        let response = 
        {
            success : true,
            message : message,
            data : data,
            copyright: "Copyright 2020, Francis Gaddi"
        }
        return response;
    }
    static fail(data = null, message = null){
        let response = 
        {
            success : false,
            message : message,
            data : data,
            copyright: "Copyright 2020, Francis Gaddi"
        }
        return response;

    }
}
module.exports =  jsonResponder;