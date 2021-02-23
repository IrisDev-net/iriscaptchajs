const irisCaptcha = require("../../lib/core/IrisCaptcha").default;


(async function(){
    let ic = new irisCaptcha({
        secret:"533a64afb4c496cc34dfd00d1ecbd45cfa2784b2c3eba4aa02e7a4dcbe081aa40x2711",
        // method:"signature",
        
    })
    
    await ic.loadPublicKey();
    console.log(ic);
    ic.validate("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWNjZXNzIjp0cnVlLCJob3N0bmFtZSI6ImlyaXNkZXYubmV0IiwiaXAiOiIxMDkuMTI1LjE3Mi40OCIsImV4cCI6MTYxNDA3MDI5NCwiaWF0IjoxNjE0MDcwMjM0fQ.bS0wYk-TN7-a4QZeEKK1IoignbhnYhvWU4ieRr6eLn-CGUMRAaK-zfm4H_G_G_kArrezGsYee03divh_IXbkBhPIsawexa-GgmY0AQAI2hAsE3fNMfiVB3ihSFC4XtkIYw7vxMSk2DYHlqR7xqNrTVzFKMnG72Vomb7NHzPTcgKz-D4NwpPoOZY3LqK6T6FYKS33A-giCHWuNquvq8ENVASCPf92o078Otk9YBjVTX1ZHKn76YYnZnmTqqrj3oi4l_4B3Ez3-S9RFNyyQ-MU0-KqscDgUn347H3PIpxCTCimCiFRNzQNRuydJ6754MEiZjzAJp4OP5zSkNaXqevVXg").then(res=>{
        console.log(res);
    },err=>{
        console.error(err);
    });

})();