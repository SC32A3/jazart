package global.sesoc.jazart.detect;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.ObjectInputStream;
import java.util.ArrayList;

public class FrequencyAnalysis {
	final double[] freq = { 261.6256, 277.1826, 293.6648, 311.1270, 329.6276, 349.2282, 369.9944, 391.9954, 415.3047,
			440, 466.1638, 493.8833 };
	final String[] scale = { "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" };

	public FrequencyAnalysis() {
		File f = new File("C:/Users/user/Downloads/result.txt");
		try {
			ObjectInputStream ois = new ObjectInputStream(new BufferedInputStream(new FileInputStream(f)));
			ArrayList<Double> d = (ArrayList<Double>) ois.readObject();
			for (int i = 0; i < d.size(); i++) {
				double thisFreq = d.get(i);
				int octave = 0;
				if (thisFreq < 63.5709) {
					octave = 1;
				} else if (thisFreq < 127.1418) {
					octave = 2;
				} else if (thisFreq < 254.28365) {
					octave = 3;
				} else if (thisFreq < 508.5672) {
					octave = 4;
				} else if (thisFreq < 1017.1343) {
					octave = 5;
				} else if (thisFreq < 2034.269) {
					octave = 6;
				} else if (thisFreq < 4068.5375) {
					octave = 7;
				} else {
					continue;
				}
				
				thisFreq = Math.pow(thisFreq, 4-octave);
				int index = binarySearch(freq, d.get(i));
				System.out.println(d.get(i) + " / " + scale[index] + octave);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		new FrequencyAnalysis();
	}

	static int binarySearch(double[] search, double find) {
		for (int i = 0; i < search.length - 1; i++) {
			if (search[i] <= find && find <= search[i + 1]) {
				double gijun = search[i] + ((search[i + 1] - search[i]) / 2);
				if (find > gijun) {
					return i + 1;
				} else {
					return i;
				}
			}
		}
		return 0;
	}
}
