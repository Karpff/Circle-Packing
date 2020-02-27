function circle(x,y,color)
{
  this.x = x;
  this.y = y;
  this.color = color;
  this.r = 0;
  this.growing = true;

  this.grow = function()
  {
    if(this.growing)
    {
      this.r += growRate;
    }
  }
  this.draw = function()
  {
    c.beginPath();
    c.fillStyle = "rgb("+this.color[0]+","+this.color[1]+","+this.color[2]+")";
    c.arc(this.x,this.y,this.r,0,Math.PI*2);
    c.fill();
  }
}
