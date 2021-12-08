import { LightningElement, wire, api } from 'lwc';
import { getRecordUi, getRecord } from 'lightning/uiRecordApi';
import fetchRecord from '@salesforce/apex/ReusableRelatedList.fetchRecord';
export default class GetRecordUiDemo extends LightningElement {
  // @api recordId

  getRecordUiData
  getRecordData
  /****First adapter ***/
  @wire(getRecordUi, { recordIds: '0018d0000038aWsAAI', layoutTypes: 'Full', modes: 'View' })
  accountRecordUiHandler({data, error}){
    if(data){
      console.log("getRecordUi", data)
      this.getRecordUiData = data
    }
    if(error){
      console.error(error)
    }
  };
   /****Second adapter ***/
  @wire(getRecord, { recordId: '0018d0000038aWsAAI', layoutTypes: ['Full']})
  accountRecordHandler({data, error}){
    if(data){
      console.log("getRecord", data)
      this.getRecordData = data
    } 
    if(error){
      console.error(error)
    }
  };

  get recordUiData(){
    return this.getRecordUiData && JSON.stringify(this.getRecordUiData, null, 4)
  }
  get recordData(){
    return this.getRecordData && JSON.stringify(this.getRecordData, null, 4)
  }
/****Custom Aapex calling ***/
  @wire(fetchRecord, {
    recId: '0018d0000038aWsAAI',
    sObjName:  'Contact',
    parentFldNam: 'AccountId'
 })wiredFetchRecord({data, error}) {
   if(data){
    console.log("related contacts", data)
   }
   if(error){
    console.error(error)
   }
   
 }

 @wire(fetchRecord, {
  recId: '0018d0000038aWsAAI',
  sObjName:  'Opportunity',
  parentFldNam: 'AccountId'
})wiredFetchOppRecord({data, error}) {
 if(data){
  console.log("related Opportunity", data)
 }
 if(error){
  console.error(error)
 }
 
}
  
}