var canvas =  document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 600;
var c = canvas.getContext('2d');

var photo;
var image;
var d;

var cir = [];
var poppin = false;

//Config
var growRate = 1;

window.addEventListener("load",_=>
{
  photo = document.getElementById("photo");
  image = document.getElementById("image");
  image.width = 1000;
  image.height = 600;
  d = image.getContext('2d');

  d.drawImage(photo,0,0,1000,600);

  window.addEventListener('mousedown',function(e)
  {
    poppin = true;
    var cords = {x: e.x, y: e.y};
    for(var i=0;i<cir.length;i++)
    {
      if(distance(cords,cir[i])<cir[i].r)
      {
        c.fillStyle = "black";
        c.beginPath();
        c.arc(cir[i].x,cir[i].y,cir[i].r+1,0,Math.PI*2)
        c.fill();
        var p = d.getImageData(cords.x, cords.y, 1, 1).data;
        cir.splice(i,1,new circle(cords.x,cords.y,p))
      }
    }
  });

  window.addEventListener('mouseup',function(e)
  {
    poppin = false;
  });

  window.addEventListener('mousemove',function(e)
  {
    if(poppin)
    {
      var cords = {x: e.x, y: e.y};
      for(var i=0;i<cir.length;i++)
      {
        if(distance(cords,cir[i])<cir[i].r)
        {
          c.fillStyle = "black";
          c.beginPath();
          c.arc(cir[i].x,cir[i].y,cir[i].r+1,0,Math.PI*2)
          c.fill();
          var p = d.getImageData(cords.x, cords.y, 1, 1).data;
          cir.splice(i,1,new circle(cords.x,cords.y,p))
        }
      }
    }
  });

  function distance(x,y)
  {
    return Math.sqrt(Math.abs(x.x-y.x)*Math.abs(x.x-y.x)+Math.abs(y.y-x.y)*Math.abs(y.y-x.y));
  }

  c.fillStyle = "black";
  c.fillRect(0,0,canvas.width,canvas.height);

  function animate()
  {
    var attempts = 1000;
    var failed = true;
    while(failed && attempts > 0)
    {
      failed = false;
      var newC = { x: Math.random()*canvas.width, y: Math.random()*canvas.height};
      for(var i=0;i<cir.length;i++)
      {
        if(distance(newC,cir[i]) < cir[i].r+3)
        {
          failed = true;
          attempts--;
          break;
        }
      }
    }
    var p = d.getImageData(newC.x, newC.y, 1, 1).data;
    cir.push(new circle(newC.x,newC.y,p));
    for(var i=0;i<cir.length;i++)
    {
      if(cir[i].growing)
      {
        cir[i].grow();
        cir[i].draw();
        for(var j=0;j<cir.length;j++)
        {
          if(i != j && distance(cir[i],cir[j]) <= cir[i].r + cir[j].r + 1)
          {
            cir[i].growing = false;
            cir[j].growing = false;
          }
          if(cir[i].x+cir[i].r>canvas.width-3 || cir[i].x-cir[i].r<3 || cir[i].y+cir[i].r>canvas.height-3 || cir[i].y-cir[i].r<3)cir[i].growing=false;
        }
      }
    }
    //if(growRate > 0.1)growRate -= 0.0001;
    //else growRate = 1;
    window.requestAnimationFrame(animate);
  }
  animate();
});