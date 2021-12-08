public without sharing class ReusableRelatedList {
    @AuraEnabled (cacheable=true)
    public static RelatedListResult fetchRecord( String recId, String sObjName, String parentFldNam) {
        List <sObject> listsObjects = new List <sObject>();
        RelatedListResult obj = new RelatedListResult();
        String strSOQL = 'SELECT Id, Name FROM ' + sObjName + ' WHERE ' + parentFldNam + ' =:recId';
        listsObjects =  Database.query(strSOQL);
        Integer intCount = listsObjects.size();
        if ( intCount > 1 ) {
            List < sObject > tempListsObjects = new List < sObject >();
            for ( Integer i = 0; i <intCount; i++ )
                tempListsObjects.add( listsObjects.get( i ) );
            obj.listsObject = tempListsObjects;
        } else {
            obj.listsObject = listsObjects;
        }
        return obj;
    }
    public class RelatedListResult {
        @AuraEnabled
        public List <sObject> listsObject;
    }
}