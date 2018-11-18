class App extends React.Component{
  state={
    editorText : `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`,
    previewText: ``
  }
handleChange = (e) => {
  const text = e.target.value;
  this.setState({
    editorText: text,
  })
  if (this.state.editorText){
    this.previewText(text)
  }
}
componentDidMount(){
  const text = this.state.editorText
  this.previewText(text)
}
previewText = text =>{
  const newText = this.processText(text);
  this.setState({
    previewText: newText
  })
}
processText = text => {
  const markedText = marked(text);
  const final =  markedText.replace(/(\r\n|\n|\r)/gm, "<br>");
  return final
}
  
  render(){
    return(
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-9 mx-auto">
             <div className="card d-block">
               <p className="card-header lead d-block"><i className="fa fa-pencil"></i> Editor 
               </p>
               <div className="card-body">
                  <textarea id="editor" style={{"resize" : "none", "margin" : 0, "width" : "100%", "height": 200}} className="mx-auto" onChange={this.handleChange} value={this.state.editorText} />
                </div>
             </div>
          </div>
        </div>
  <div className="row">
          <div className="container-fluid mt-5 mx-auto">
             <div className="card d-block">
               <p className="card-header lead d-block"><i className="fa fa-pencil"></i> Previewer
               </p>
               <div id="preview" className="card-body" dangerouslySetInnerHTML={{__html: marked(this.state.editorText)}}>
                </div>
             </div>
          </div>
        </div>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.querySelector("#app"))