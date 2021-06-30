import React, { Component } from 'react';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';
import { Button } from 'reactstrap';
import "./App.css";


class App extends Component {
  state = {      
    ipfsHash:null,      
    buffer:'',      
    ethAddress:'',      
    transactionHash:'',      
    txReceipt: ''    
  };


  //Take file input from user
  captureFile =(event) => {event.stopPropagation() 
    event.preventDefault() 
    const file = event.target.files[0] 
    let reader = new window.FileReader() 
    reader.readAsArrayBuffer(file) 
    reader.onloadend = () => this.convertToBuffer(reader) };


  //Convert the file to buffer to store on IPFS 
    convertToBuffer = async(reader) => {

  //file is converted to a buffer for upload to IPFS        
    const buffer = await Buffer.from(reader.result);   

  //set this buffer-using es6 syntax        
    this.setState({buffer});};

  //ES6 async 
    functiononClick = async () => {try{this.setState({blockNumber:"waiting.."});        
    this.setState({gasUsed:"waiting..."});
    await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{          
      console.log(err,txReceipt);          
      this.setState({txReceipt});        
    });      
  }

  catch(error){      
    console.log(error);   
   }}


   onSubmit = async (event) => {      
     event.preventDefault();

     //bring in user's metamask account address      
     const accounts = await web3.eth.getAccounts();   

     //obtain contract address from storehash.js      
     const ethAddress= await storehash.options.address;      
     this.setState({ethAddress});    

     //save document to IPFS,return its hash#, and set hash# to state      
     await ipfs.add(this.state.buffer, (err, ipfsHash) => {        
       console.log(err,ipfsHash);        

       //setState by setting ipfsHash to ipfsHash[0].hash        
       this.setState({ ipfsHash:ipfsHash[0].hash });       
       
       
       // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract       
      //return the transaction hash from the ethereum contract        
      storehash.methods.sendhash1(this.state.ipfsHash).send({          
        from: accounts[0]        
      }, 
        (error, transactionHash) => {          
        console.log(transactionHash);          
        this.setState({transactionHash});        
      });  

      storehash.methods.sendhash2(this.state.ipfsHash).send({          
        from: accounts[0]        
      }, 
        (error, transactionHash) => {          
        console.log(transactionHash);          
        this.setState({transactionHash});        
      });  

      storehash.methods.sendhash3(this.state.ipfsHash).send({          
        from: accounts[0]        
      }, 
        (error, transactionHash) => {          
        console.log(transactionHash);          
        this.setState({transactionHash});        
      });  

      storehash.methods.sendhash4(this.state.ipfsHash).send({          
        from: accounts[0]        
      }, 
        (error, transactionHash) => {          
        console.log(transactionHash);          
        this.setState({transactionHash});        
      });  

      

    })    
  };


  render() {
    return (        
    <div className="App">          
    <header className="App-header">  
    <h1>EduDecentro</h1>          
    </header>

    <hr/>
    <grid>          
      <h5> Choose Transcript file  </h5>          
      <form onSubmit={this.onSubmit}>            
      <input              
      type = "file"              
      onChange = {this.captureFile}            
      />             
      <Button             
      bsStyle="primary"             
      type="submit">             
      Send it             
      </Button> 
      </form>
      <tbody>                 
         <tr>                   
           <td>IPFS Hash</td>                   
            <td> : </td>                    
            <td>{this.state.ipfsHash}</td>                  
            </tr>
      </tbody>
      

      <h5> Choose Certificate-1 file  </h5>          
      <form onSubmit={this.onSubmit}>            
      <input              
      type = "file"              
      onChange = {this.captureFile}            
      />             
      <Button             
      bsStyle="primary"             
      type="submit">             
      Send it             
      </Button> 
      </form>
      <tbody>                 
         <tr>                   
           <td>IPFS Hash</td>                   
            <td> : </td>                    
            <td>{this.state.ipfsHash}</td>                  
            </tr>
      </tbody>

      <h5> Choose Certificate-2 file  </h5>          
      <form onSubmit={this.onSubmit}>            
      <input              
      type = "file"              
      onChange = {this.captureFile}            
      />             
      <Button             
      bsStyle="primary"             
      type="submit">             
      Send it             
      </Button> 
      </form>
      <tbody>                 
         <tr>                   
           <td>IPFS Hash</td>                   
            <td> : </td>                    
            <td>{this.state.ipfsHash}</td>                  
            </tr>
      </tbody>

      <h5> Choose Resume file  </h5>          
      <form onSubmit={this.onSubmit}>            
      <input              
      type = "file"              
      onChange = {this.captureFile}            
      />             
      <Button             
      bsStyle="primary"             
      type="submit">             
      Send it             
      </Button> 
      </form>
      <tbody>                 
         <tr>                   
           <td>IPFS Hash</td>                   
            <td> : </td>                    
            <td>{this.state.ipfsHash}</td>                  
            </tr>
      </tbody>


       
      <hr/> 
      <Button             
      bsStyle="primary"             
      type="submit">             
      LOGOUT            
      </Button>
      </grid>     
    </div>      
   );    
}}

 export default App;