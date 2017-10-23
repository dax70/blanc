// import { Subscription } from '../Subscriptions';

import { BlancDocument, DocumentNode } from '../document';
import HtmlFactory from '../HtmlFactory';

describe('Document functionality tests', () => {

  test('addComponent invokes onDidAddComponent when subscribed', () => {
    const documentContent = new BlancDocument();
    const actual = HtmlFactory.create(
      'div',
      { style: { color: 'blue' } },
      ['Hello World']
    );

    let expected;
    const callback = jest.fn((docNode: DocumentNode) => { 
      expected = docNode; 
    });
    const sub = documentContent.onDidAddComponent(callback);   

    documentContent.addComponent(actual);
    expect(callback).toHaveBeenCalled();
    expect(expected).toEqual(actual);
    sub.unsubscribe();
  });

  test('addComponent does not invoke onDidAddComponent after unsubscribed', () => {
    const documentContent = new BlancDocument();
    const first = HtmlFactory.create(
      'div',
      { style: { color: 'blue' } },
      ['Hello World']
    );

    const second = HtmlFactory.create(
      'div',
      { style: { color: 'blue' } },
      ['Hello World']
    );

    let expected;
    const callback = jest.fn((docNode: DocumentNode) => { 
      expected = docNode; 
    });
    const sub = documentContent.onDidAddComponent(callback);   

    documentContent.addComponent(first);
    sub.unsubscribe();
    documentContent.addComponent(second);
    
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('insertComponent invokes onDidInsertComponent when subscribed', () => {
    const documentContent = new BlancDocument();
    const first = HtmlFactory.create(
      'div',
      { style: { color: 'blue' } },
      ['Hello World']
    );

    const second = HtmlFactory.create(
      'div',
      { style: { color: 'blue' } },
      ['Hello World']
    );

    const actual = { index: 0, item: second };

    let expected: { index: number, item: DocumentNode } | {} = {};
    const callback = jest.fn((insertArgs) => { expected = insertArgs; });
    const sub = documentContent.onDidInsertComponent(callback);   

    documentContent.addComponent(first);    
    documentContent.insertComponent(0, second);
    
    expect(callback).toHaveBeenCalled();
    expect(expected).toEqual(actual);    

    sub.unsubscribe();
  });

  test('removeComponent invokes onDidRemoveComponent', () => {
    const documentContent = new BlancDocument();
    const first = HtmlFactory.create(
      'div',
      { style: { color: 'blue' } },
      ['Hello World']
    );

    const second = HtmlFactory.create(
      'div',
      { style: { color: 'blue' } },
      ['Hello World']
    );

    const actual = { index: 1, item: second };

    let expected: { index: number, item: DocumentNode } | {} = {};
    const callback = jest.fn((insertArgs) => { expected = insertArgs; });
    const sub = documentContent.onDidRemoveComponent(callback);   

    documentContent.addComponent(first);    
    documentContent.addComponent(second);        
    documentContent.removeComponent(second);
    
    expect(callback).toHaveBeenCalled();
    expect(expected).toEqual(actual);    

    sub.unsubscribe();
  });

  test('removeComponent throws when no component found', () => {
    const documentContent = new BlancDocument();
    const first = HtmlFactory.create(
      'div',
      { style: { color: 'blue' } },
      ['Hello World']
    );

    const second = HtmlFactory.create(
      'div',
      { style: { color: 'blue' } },
      ['Hello World']
    );

    documentContent.addComponent(first);    
    
    expect(() => {
      documentContent.removeComponent(second);
    }).toThrowError('Unable to find component to remove.'); 
  });
});