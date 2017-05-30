package global.sesoc.jazart.detect;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;

public class FrequencyAnalysis {
	final double[] freq = { 261.6256, 277.1826, 293.6648, 311.1270, 329.6276, 349.2282, 369.9944, 391.9954, 415.3047,
			440, 466.1638, 493.8833 };
	final String[] scale = { "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" };
	public ArrayList<Object> melodyLine;

	public FrequencyAnalysis() {
		melodyLine = new ArrayList<>();
		File f = new File("/userSource/makeMelody.dat");
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

				thisFreq = thisFreq * Math.pow(2, 4 - octave);
				int index = binarySearch(freq, thisFreq);
				Object[] melody = { scale[index], octave };
				melodyLine.add(melody);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		FileOutputStream fos;
		try {
			fos = new FileOutputStream(new File("/userSource/melodyLine.dat"));
			ObjectOutputStream oos = new ObjectOutputStream(fos);
			oos.writeObject(melodyLine);
			oos.flush();
			oos.close();
			fos.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	static int binarySearch(double[] freq, double find) {
		int index = 0;

		for (int i = 0; i < freq.length - 1; i++) {
			if (freq[i] <= find && find <= freq[i + 1]) {
				double gijun = freq[i] + ((freq[i + 1] - freq[i]) / 2);
				if (find > gijun) {
					index = i + 1;
					break;
				} else {
					index = i;
					break;
				}
			}
		}

		return index;
	}
}
