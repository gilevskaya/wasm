void js_log(int i);

void hello42() {
  js_log(42);
}

int accumulate(int* start, int count) {
  int sum = 0;
  for (int i = 0; i < count; i++) {
    sum += start[i];
  }
  return sum;
}

