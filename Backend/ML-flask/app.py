# Import libraries
import numpy as np
import pandas as pd
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn import model_selection
from sklearn.tree import DecisionTreeClassifier
import pickle
import json
import numpy as np
from flask import Flask, request

app = Flask(__name__)


def predict_symptoms(l):

    data = pd.read_csv("dataset_clean.csv", encoding ="ISO-8859-1")
    df = pd.DataFrame(data)
    df_1 = pd.get_dummies(df.Target)
    df_s = df['Source']
    df_pivoted = pd.concat([df_s,df_1], axis=1)
    df_pivoted.drop_duplicates(keep='first',inplace=True)
    df_pivoted[:5]

    cols = df_pivoted.columns
    cols = cols[1:]
    df_pivoted = df_pivoted.groupby('Source').sum()
    df_pivoted = df_pivoted.reset_index()
    df_pivoted[:5]

    df_pivoted.to_csv("df_pivoted.csv")
    x = df_pivoted[cols]
    y = df_pivoted['Source']

    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=42)

    mnb = MultinomialNB()
    mnb = mnb.fit(x_train, y_train)

    mnb_tot = MultinomialNB()
    mnb_tot = mnb_tot.fit(x, y)

    disease_pred = mnb_tot.predict(x)
    disease_real = y.values

    dt = DecisionTreeClassifier()
    clf_dt=dt.fit(x,y)

    data = pd.read_csv("Training.csv")

    df = pd.DataFrame(data)
    cols = df.columns
    cols = cols[:-1]
    x = df[cols]
    y = df['prognosis']

    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=42)
    mnb = MultinomialNB()
    mnb = mnb.fit(x_train, y_train)

    test_data = pd.read_csv("Testing.csv")

    testx = test_data[cols]
    testy = test_data['prognosis']
    mnb.score(testx, testy)

    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=42)

    clf_dt=dt.fit(x_train,y_train)

    scores = model_selection.cross_val_score(dt, x_test, y_test, cv=3)

    importances = dt.feature_importances_
    indices = np.argsort(importances)[::-1]
    features = cols

    feature_dict = {}
    for i,f in enumerate(features):
        feature_dict[f] = i
    # print("Enter 3 Symptoms")
    for i in l:
        s=i
        m=feature_dict[s]
        if (m!=0):
            sample_x = [i/m if i ==m else i*0 for i in range(len(features))]

    filename = 'finalized_model.sav'
    pickle.dump(clf_dt, open(filename, 'wb'))

    loaded_model = pickle.load(open(filename, 'rb'))
    result = loaded_model.score(x_train, y_train)

    sample_x = np.array(sample_x).reshape(1,len(sample_x))
    p_disease=clf_dt.predict(sample_x)

    return p_disease


@app.route('/api',methods=['GET'])
def func():
    return '<h1>Hello</h1>'


@app.route('/api',methods=['POST'])
def predict():
    # Get the data from the POST request.
    data = request.get_json(force=True)
    
    output = predict_symptoms(data['symptoms'])

    x = {
    "diseases": output[0]
    }

    # convert into JSON:
    y = json.dumps(x)

    return y
    
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080)