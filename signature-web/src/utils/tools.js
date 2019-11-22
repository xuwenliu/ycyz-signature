export function versionStringToInt(ver){
  var a=ver.toString();
  if (a.split('.').length == 2) a += '.0';

  var c=a.split('.');
  var num_place=["","0","00","000","0000"],r=num_place.reverse();
  for (var i=0;i<c.length;i++){ 
     var len=c[i].length;       
     c[i]=r[len]+c[i];  
  } 
  var res= c.join(''); 
  return res; 
} 