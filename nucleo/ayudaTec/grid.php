<div id="source-html">
    <h1>
        <center>Artificial Intelligence</center>
    </h1>
    <h2>Overview</h2>
    <p>
        Artificial Intelligence(AI) is an emerging technology
        demonstrating machine intelligence. The sub studies like <u><i>Neural
                Networks</i>, <i>Robatics</i> or <i>Machine Learning</i></u> are
        the parts of AI. This technology is expected to be a prime part
        of the real world in all levels.
 
    </p>
	<table  border="1" style="border: solid 2px red; width: 100%">
	     <THEAD>
		     <tr><th>COLUMNA1</th><th>COLUMNA1</th><th>COLUMNA1</th></tr>
		 </THEAD>
		 <tbody>
		     <tr> <td>COLUMNA1</td><td>COLUMNA1</td><td>COLUMNA1</td></tr>
		 </tbody>
	</table>

	<img src='https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=14E4010087JOSEGUADALUPEAGUILARHERNANDEZ'>
</img>

</div>
<div class="content-footer">
    <button id="btn-export" onclick="exportHTML();">Export to
        word doc</button>
</div>






<script>
    function exportHTML(){
       var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
       var footer = "</body></html>";
       var sourceHTML = header+document.getElementById("source-html").innerHTML+footer;
       
       var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
       var fileDownload = document.createElement("a");
       document.body.appendChild(fileDownload);
       fileDownload.href = source;
       fileDownload.download = 'document.doc';
       fileDownload.click();
       document.body.removeChild(fileDownload);
    }
</script>