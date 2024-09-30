import pandas as pd
import matplotlib.pyplot as plt

# Read the Excel file
df = pd.read_excel('oilpricedata.xlsx')

# Resample the data to monthly frequency
df_monthly = df.resample('M').mean()

# Create a line chart
df_monthly.plot(kind='line')
plt.title('Monthly Oil Price Chart')
plt.xlabel('Date')
plt.ylabel('Oil Price')
plt.show()
