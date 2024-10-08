from unittest import result
import matplotlib.pyplot as plt
import seaborn as sns
import statsmodels.api as sm

def display_result(result, analysis_type, display_option):
    if display_option == "Print":
        print(result)
    elif display_option == "Graph":
        display_graph_result(result, analysis_type)
    else:
        print("Error: Invalid display option.")
    print(f"Analysis Type: {analysis_type}")
    print(f"Result: {result}")
    print(f"Display Option: {display_option}")

def perform_statistical_analysis(data, analysis_type, display_option):
    result = None
    
    if analysis_type == "Summary Statistics":
        result = calculate_summary_statistics(data)
    elif analysis_type == "Correlation Analysis":
        result = perform_correlation_analysis(data)
    elif analysis_type == "Regression Analysis":
        result = perform_regression_analysis(data)
    
    if result is not None:
        display_result(result, analysis_type, display_option)
    else:
        print("Error: Unable to perform the selected analysis.")

def calculate_summary_statistics(data):
    import pandas as pd

    def calculate_summary_statistics(data):
        summary = {
            'mean': data.mean(),
            'median': data.median(),
            'std_dev': data.std(),
            'min': data.min(),
            'max': data.max()
        }
        return pd.Series(summary)

    def perform_correlation_analysis(data):
        # Implement correlation analysis here
        pass

    def perform_regression_analysis(data):
        # Placeholder implementation for regression analysis
        print("Regression analysis is not yet implemented.")
    # Placeholder implementation for regression analysis
    print("Regression analysis is not yet implemented.")
    print("Summary Statistics:")
    print(result.to_string())
    print("Correlation Matrix:")
    print(result.to_string())
    print("Regression Results:")
    print(result.summary())
    print(result.summary())
    print(result.summary())

def display_graph_result(result, analysis_type):
    plt.figure(figsize=(10, 6))
    
    if analysis_type == "Summary Statistics":
        result.plot(kind='bar')
        plt.title("Summary Statistics")
        plt.xlabel("Metrics")
        plt.ylabel("Values")
    elif analysis_type == "Correlation Analysis":
        sns.heatmap(result, annot=True, cmap='coolwarm')
        plt.title("Correlation Heatmap")
    elif analysis_type == "Regression Analysis":
        # Assuming result contains predicted values and actual values
        plt.scatter(result['Actual'], result['Predicted'])
        plt.plot([result['Actual'].min(), result['Actual'].max()], 
                 [result['Actual'].min(), result['Actual'].max()], 
                 'r--', lw=2)
        plt.title("Regression Analysis: Actual vs Predicted")
        plt.xlabel("Actual Values")
        plt.ylabel("Predicted Values")
    
    plt.tight_layout()
    plt.show()

# ... rest of the existing code ...