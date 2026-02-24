```python
import matplotlib.pyplot as plt
import numpy as np

style = {'dark': 'dark_background', 'light': 'seaborn-v0_8-muted'}
theme = 'light'

# color styles
#plt.style.use('dark_background')
#plt.style.use('ggplot') # or 'seaborn-v0_8-muted'
plt.style.use(style[theme])

# Set up the figure and axis
fig, ax = plt.subplots(figsize=(10, 7))

# Define the coordinates
p0 = (0, 0)
p1 = (10, 10)
p2 = (10, 0)
p3 = (30, 10)
p4 = (20, 0)

# 1. Plot the points (Red dots)
points = [p0, p1, p2, p3, p4]
labels = ['Origin', 'Prism 1', 'Prism 2', 'Prism 3', 'Prism 4']

for p, label in zip(points, labels):
    ax.plot(p[0], p[1], 'ro', markersize=8)
    ax.text(p[0], p[1] + 0.8, f'{label} {p}', ha='center', fontsize=10, fontweight='bold')

# 2. Draw the arrows with specific colors
# Arrow: (0, 0) to Point 2 (Blue)
ax.annotate('', xy=p2, xytext=(0, 0),
            arrowprops=dict(facecolor='blue', edgecolor='blue', shrink=0, width=1.5, headwidth=8))

# Arrow: Point 2 to Point 1 (Green)
ax.annotate('', xy=p1, xytext=p2,
            arrowprops=dict(facecolor='green', edgecolor='green', shrink=0, width=1.5, headwidth=8))

# Arrow: Point 1 to Point 3 (Red)
ax.annotate('', xy=p3, xytext=p1,
            arrowprops=dict(facecolor='red', edgecolor='red', shrink=0, width=1.5, headwidth=8))

# Arrow: Point 3 at 45 degrees (Orange)
# We calculate a point at (30+7, 10+7) to ensure a perfect 45-degree slope
end_p3_arrow = (p3[0] + 7, p3[1] + 7)
ax.annotate('', xy=end_p3_arrow, xytext=p3,
            arrowprops=dict(facecolor='orange', edgecolor='orange', shrink=0, width=1.5, headwidth=8))

# 3. Configure the Grid and Axes
ax.set_xlim(-2, 40)
ax.set_ylim(-2, 20)

# Ensure the x-axis counts up without repetition (increments of 5)
ax.set_xticks(np.arange(0, 41, 5))
ax.set_yticks(np.arange(0, 21, 5))

ax.grid(True, linestyle='--', alpha=0.6)
ax.set_xlabel('X axis', fontsize=12)
ax.set_ylabel('Y axis', fontsize=12)

# Show the plot
plt.tight_layout()
#plt.show()
plt.savefig(f'laser_path-{theme}.svg', transparent=True)
```
