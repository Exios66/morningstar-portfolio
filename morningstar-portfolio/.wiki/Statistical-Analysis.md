# Statistical Analysis

Our application offers a range of statistical analysis tools to help researchers and practitioners analyze their data. Here's an overview of the available analyses:

## Cronbach's Alpha
- **Purpose**: Measures the internal consistency of a set of scale or test items.
- **Formula**: α = [n / (n-1)] * [1 - (Σσ²(Yi) / σ²X)]
- **Interpretation**: Values range from 0 to 1, with higher values indicating better internal consistency.

## Split-Half Reliability
- **Purpose**: Assesses the internal consistency of a test by splitting the test into two halves and examining the correlation between the halves.
- **Formula**: rSB = (2r) / (1+r), where r is the correlation between the two halves.
- **Interpretation**: Values closer to 1 indicate higher reliability.

## ANOVA (Analysis of Variance)
- **Purpose**: Compares means across three or more groups to determine if there are any statistically significant differences between them.
- **Formula**: F = MSbetween / MSwithin
- **Interpretation**: A significant F-ratio suggests that there are differences between the groups being compared.

## Inter-Item Validity
- **Purpose**: Examines the relationships between individual items in a scale or test.
- **Method**: Calculates correlations between all pairs of items.
- **Interpretation**: Higher average correlations suggest better inter-item validity.

## Psychometric Analysis
- **Purpose**: Provides a comprehensive overview of the psychometric properties of a scale or test.
- **Includes**: Item means, standard deviations, item-total correlations, and overall scale statistics.
- **Interpretation**: Helps in identifying problematic items and assessing overall scale quality.

## IRT (Item Response Theory) Analysis
- **Purpose**: Models the relationship between an individual's response to an item and their level of the latent trait being measured.
- **Model**: 2PL (Two-Parameter Logistic) model
- **Parameters**: Item difficulty (b) and discrimination (a)
- **Interpretation**: Provides insights into how well each item discriminates between individuals with different levels of the trait.

## Regression Analysis
- **Purpose**: Examines the relationship between a dependent variable and one or more independent variables.
- **Output**: Regression equation, R² value
- **Interpretation**: R² indicates the proportion of variance in the dependent variable explained by the independent variable(s).

## Correlation Analysis
- **Purpose**: Measures the strength and direction of the relationship between two variables.
- **Formula**: r = Σ((X - μX)(Y - μY)) / (σX * σY)
- **Interpretation**: Values range from -1 to 1, with -1 indicating a perfect negative correlation, 0 indicating no correlation, and 1 indicating a perfect positive correlation.

## Factor Analysis
- **Purpose**: Identifies underlying factors or dimensions in a set of observed variables.
- **Method**: Principal Component Analysis (PCA)
- **Output**: Eigenvalues and explained variance for each factor
- **Interpretation**: Helps in understanding the underlying structure of the data and potentially reducing the number of variables.

## Descriptive Statistics
- **Purpose**: Provides summary statistics for each variable in the dataset.
- **Includes**: Mean, median, mode, standard deviation, minimum, and maximum values
- **Interpretation**: Offers a quick overview of the central tendency and spread of the data.

For each analysis, our application provides:
- Numerical results
- Data visualization
- The formula used in the calculation
- Step-by-step logic explanation

To use these analyses, upload a CSV or JSON file containing your data and select the desired analysis type.