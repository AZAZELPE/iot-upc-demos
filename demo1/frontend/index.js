

const btn1Clicked = async () => {

  const url = "https://txd8r0w1xd.execute-api.us-east-1.amazonaws.com/dev/api/iot/";
  //const data = {id: 'item1'};  
  const result = await myhttp.get(url);

  let div1 = ('#listaItems');

  result.map((item)=>{



    $('<button/>')
      .addClass('btn btn-link')
      .attr('type','button').attr('data-toggle','collapse').attr('data-target','#collapseOne').attr('type','button')
      .text(item.id)
      .appendTo(div1);
  })
  

  type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"

};


const myhttp = {
  get: async (url) => {
    return new Promise((resolve,reject)=>{
      fn = ( result ) => { resolve(result); }
      ajaxHttp('get',fn,url);
    })
  },
  post: async (url,data) => {
    return new Promise((resolve,reject)=>{
      fn = ( result ) => { resolve(result); }
      ajaxHttp('post',fn,url,data);
    })
  }
}

const ajaxHttp = (method,fn, url,data) => {
  let mydata;
  if(data==undefined) mydata = "";
  $.ajax({
    url: url,
    method: 'get',
    data: mydata,
    success: fn
  });
}

